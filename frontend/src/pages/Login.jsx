import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {
     const {login} = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //  To Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); 

    login(email, password)

    };
    return(
        <div className="register">
            <img src={logo} alt="Cooquie's Logo" className="register-logo"/>
            <h2>Welcome back!</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
            <div className="form">
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

                <button type="submit" className="register-btn">Continue</button>
                <p>Don't have an account? <Link to="/register"> Sign up</Link></p>
            </div>
            </form>
        </div>
    )
}