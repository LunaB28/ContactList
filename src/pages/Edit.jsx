import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`https://playground.4geeks.com/agendas/luna/contacts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.contact.name);
                setPhone(data.contact.phone);
                setEmail(data.contact.email);
                setAddress(data.contact.address);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://playground.4geeks.com/contact/agendas/luna/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                address
            })
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al actualizar");
                return response.json();
            })
            .then(() => navigate("/"))
            .catch(() => setMessage("Error al actualizar el contacto"));
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <button type="submit">Actualizar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
