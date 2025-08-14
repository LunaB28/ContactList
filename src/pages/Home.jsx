import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storeAsyncDispatch } from "../store.js";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [selectedContactId, setSelectedContactId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        storeAsyncDispatch(dispatch, { type: "fetch_contacts" });
    }, [dispatch]);

    function handleDelete() {
        if (!selectedContactId) return;
        storeAsyncDispatch(dispatch, { type: "delete_contact", payload: { id: selectedContactId } });
        setSelectedContactId(null);
    }

    function handleEdit() {
        if (!selectedContactId) return;
        navigate(`/edit/${selectedContactId}`);
    }

    const contact = store.contacts;

    return (
        <div className="m-5 bg-light py-4 rounded-4">
            <div className="d-flex justify-content-end mx-5">
                <button
                    className="btn btn-primary my-1 mx-5 fix-end"
                    onClick={() => navigate("/new")}
                >
                    Add Contact
                </button>
            </div>
            <ul className="list-group">
                {contact.length === 0 ? (
                    <li className="list-group-item d-flex bg-secondary mx-5 p-3 justify-content-center">
                        <span className="flex-grow-1">Add a New Contact :D</span>
                    </li>
                ) : (
                    contact.map((item) => (
                        <li
                            key={item.id}
                            className="list-group-item d-flex object-fit-content bg-secondary border rounded justify-content-center mx-5 my-1"
                        >
                            <img
                                src="https://i.pinimg.com/736x/a3/db/a0/a3dba0117d28fd677055a3f4494131c1.jpg"
                                className="rounded-circle border mx-5"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover"
                                }}
                            />
                            <div className="card-body p-2 mx-5 ">
                                <h5 className="card-title mb-2">{item.name}</h5>
                                <h6 className="card-subtitle ">📞 {item.phone}</h6>
                                <p className="card-subtitle ">📩 {item.email}</p>
                                <p className="card-subtitle ">📍 {item.address}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-warning mx-1"
                                    onClick={() => {
                                        setSelectedContactId(item.id);
                                        handleEdit();
                                    }}
                                >✏</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalSm"
                                    onClick={() => setSelectedContactId(item.id)}
                                >❌</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            <div
                className="modal fade" id="exampleModalSm" tabIndex="-1" aria-labelledby="exampleModalSmLabel" aria-hidden="true"
            >
                <div className="modal-dialog modal-sm ">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalSmLabel">Delete?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-dangerr"
                                data-bs-dismiss="modal"
                                onClick={handleDelete}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};