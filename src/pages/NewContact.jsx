import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewContact = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    function addContact() {
        let bodyData = {
            name,
            phone,
            email,
            address
        };
        fetch("https://playground.4geeks.com/contact/agendas/luna/contacts", {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then(() => {
                navigate("/"); // Redirige al home después de agregar
            })
            .catch(() => { });
    }

    return (
        <div>
            <h1>New Contact</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                addContact();
            }}>
                <input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};