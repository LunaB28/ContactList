import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { storeAsyncDispatch } from "../store.js";

export const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!store.contacts.length) {
            storeAsyncDispatch(dispatch, { type: "fetch_contacts" });
        }
    }, [dispatch, store.contacts.length]);

    useEffect(() => {
        const found = store.contacts.find(c => String(c.id) === String(id));
        setName(found?.name || "");
        setPhone(found?.phone || "");
        setEmail(found?.email || "");
        setAddress(found?.address || "");
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await storeAsyncDispatch(dispatch, {
            type: "update_contact",
            payload: {
                id: Number(id),
                name,
                phone,
                email,
                address
            }
        });
        navigate("/");
    };

    return (
        <div className="container my-5 bg-light py-3 rounded-4">
            <h1 className="text-center mb-5">Edit Contact</h1>
            <form className="m-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="FullName" className="form-label">Full Name</label>
                    <input className="form-control bg-secondary" id="FullName" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input className="form-control bg-secondary" id="Phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input className="form-control bg-secondary" id="Email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label">Address</label>
                    <input className="form-control bg-secondary" id="Address" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <button className="btn btn-primary w-100 mt-3" type="submit">Update</button>
                <a href="/">Go back to the Home</a>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
