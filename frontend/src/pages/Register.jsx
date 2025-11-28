import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";

export default function Register() {
    // getting data from userContext that's in context
    const {addUser} = useContext(UserContext)

    // const [name, setname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // ---> Handle form submission 
    const handleSubmit = (e) => {
        e.preventDefault();

        addUser(name, email, password)

        console.log('name:', name)
        console.log('email:', email)
        console.log('password:', password)
    }

    return(
         <div className="register">
            <img src={logo} alt="Cooquie's Logo" className="register-logo"/>
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="Jane Doe" 
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="example@gmail.com" 
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button 
                type="submit"
                className="register-btn"
                >Continue</button>
                <p>Do you already have an account? <Link to="/login"> Sign in</Link></p>
            </div>
            </form>
        </div>
    )
}