import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import "../../styles/Contacts.css";
import { Link } from "react-router-dom";

const Contacts = () => { 
    const { store, actions } = useContext(Context);  
    const [editingContact, setEditingContact] = useState(null);  
    const [name, setName] = useState("");   
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const editRef = useRef(null); 

    useEffect(() => {
        actions.fetchContacts(); 
    }, []);


    const handleEditContact = (contact) => {
        setEditingContact(contact); 
        setName(contact.name); 
        setEmail(contact.email);
        setPhone(contact.phone);
        setAddress(contact.address);

        setTimeout(() => { 
            editRef.current.scrollIntoView({ behavior: "smooth" }); 
        }, 0);
    };

    const handleSaveEdit = () => {
       
        actions.editContact({ ...editingContact, name, email, phone, address });
        setEditingContact(null); 
        setName(""); 
        setEmail("");
        setPhone("");
        setAddress("");
    };

    const handleCancelEdit = () => {
        setEditingContact(null); //Ocultar  formulario.
        setName(""); 
        setEmail("");
        setPhone("");
        setAddress("");
        window.scrollTo({ top: 0, behavior: "smooth" }); //Desplazamos la pantalla a la parte superior(contactos).
    };

    return (
        <div className="container"> 
            <div className="row add">
                <Link to="/new-contact"> 
                    <button className="btn btn-success">Add Contact</button>
                </Link>
            </div>
            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                store.contacts.map((contact, index) => ( 
                    <div className="row row-card" key={contact.id}>
                        <div className="col-3 colimg">
                            <div className="card">
                                <img
                                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2rVVXszyfE2UZfFA7En7YVxF5MjjLsEf93g&s"
                                 
                                />
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <div className="card-body">
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">{contact.email}</p>
                                <p className="card-text">{contact.phone}</p>
                                <p className="card-text">{contact.address}</p>
                            </div> 
                        </div>

                        <div className="col-3 icons">
                            <i
                                className="fa-solid fa-pen-to-square" 
                                onClick={() => handleEditContact(contact)} 
                            ></i> 
                            <i
                                className="fa-solid fa-trash"
                                onClick={() => actions.deleteContact(contact.id)} 
                            ></i>
                        </div>
                    </div>
                ))
            ) : (
                <div className="row">
                    <div className="col-12">
                        <h2>No hay contactos</h2>
                    </div>
                </div>
            )}
            {editingContact && ( 
                <div ref={editRef} className="hr"> {/* Referencia al contenedor de edición */}
                    <hr />
                    <div className="edit">
                        <div className="row title">
                            <h5>
                                <strong>Edit Contact</strong>
                            </h5>
                        </div>
                        <div className="row inputs">
                            <div className="col">
                                <label>
                                    <strong>Full name</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="text"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Name" 
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Email</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Phone</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                />
                            </div>
                            <div className="col">
                                <label>
                                    <strong>Address</strong>
                                </label>
                                <input
                                    className="inputs-edit"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                />
                            </div>
                            <div className="col col-buttons">
                                <button className="btn btn-primary" onClick={handleSaveEdit}> 
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;