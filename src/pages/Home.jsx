import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [contact, setContact] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const navigate = useNavigate();

    function getContacts() {
        fetch("https://playground.4geeks.com/contact/agendas/luna/contacts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`error ${response.status}:${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setContact(data.contacts);
                console.log("contacts: ", data.contacts);
            })
            .catch((error) => alert(error.message));
    }

    useEffect(() => {
        getContacts();
    }, []);

    function handleDelete() {
        if (!selectedContactId) return;
        fetch(`https://playground.4geeks.com/contact/agendas/luna/contacts/${selectedContactId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) throw new Error(`error ${response.status}:${response.statusText}`);
                getContacts();
            })
            .catch((error) => alert(error.message));
    }

    function handleEdit() {
        if (!selectedContactId) return;
        navigate(`/edit/${selectedContactId}`);
    }

    return (
        <div className="m-5">
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
                    <li className="list-group-item d-flex justify-content-center">
                        <span className="flex-grow-1">Añade un nuevo contacto 😀</span>
                    </li>
                ) : (
                    contact.map((item, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex object-fit-content border rounded justify-content-center mx-5 my-1"
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
                            <div className="card-body p-2 mx-5">
                                <h5 className="card-title mb-2">{item.name}</h5>
                                <h6 className="card-subtitle ">📞 {item.phone}</h6>
                                <p className="card-subtitle ">✉️ {item.email}</p>
                                <p className="card-subtitle ">📍 {item.address}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="btn mx-1"
                                    onClick={() => {
                                        setSelectedContactId(item.id);
                                        handleEdit();
                                    }}
                                >✏</button>
                                <button
                                    type="button"
                                    className="btn"
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
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalSmLabel">¿Eliminar contacto?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Esta acción no se puede deshacer.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleDelete}
                            >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};