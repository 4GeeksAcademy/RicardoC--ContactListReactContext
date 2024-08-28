import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Context } from '../store/appContext';
import "../../styles/NewContact.css";

const NewContact = () => { 
    const { actions } = useContext(Context); 
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); //Evita que se recargue la página.
        const newContact = { 
            id: Date.now(), 
            name, 
            email,
            phone,
            address,
        };
        actions.addContact(newContact) 
            .then(() => {
                navigate("/"); 
            })
            .catch(error => { 
                console.error("Error saving new contact:", error);
            }); 
};



    return (
        <div className="container">
            <h1><strong> Add a new contact</strong></h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter full name"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    /> 
                </div> 
                <div className="btns d-flex justify-content-center"> 
                <button type="submit" className="btn bg-info">Save</button>
                <Link to="/"> 
                <button type="submit" className="btn btn-danger">Get back</button> 
                </Link> 
                </div> 
            </form> 
        </div>
    );
};

export default NewContact;