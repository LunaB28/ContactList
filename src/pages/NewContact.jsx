import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { storeAsyncDispatch } from "../store.js";

export const NewContact = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    async function addContact() {
        await storeAsyncDispatch(dispatch, {
            type: "add_contact",
            payload: {
                name,
                phone,
                email,
                address
            }
        });
        navigate("/");
    }

    return (
        <div className="container my-5 bg-light py-3 rounded-4">
            <h1 className="text-center mb-5">New Contact</h1>
            <form className="m-5" onSubmit={async (e) => {
                e.preventDefault();
                await addContact();
            }}>
                <div className="mb-3">
                    <label htmlFor="FullName" className="form-label">Full Name</label>
                    <input className="form-control bg-secondary" id="FullName" placeholder="Full Name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input className="form-control bg-secondary" id="Phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input className="form-control bg-secondary" id="Email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label">Address</label>
                    <input className="form-control bg-secondary" id="Address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <button className="btn btn-primary w-100 mt-3" type="submit">Add Contact</button>
                <a href="/">Go back to the Home</a>
            </form>
        </div>
    );
};