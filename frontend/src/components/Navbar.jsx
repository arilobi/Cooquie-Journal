import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from '../context/UserContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const menuRef = useRef(null);

    const { current_user, logout } = useContext(UserContext);
    const navigate = useNavigate(); // <-- add this

    const handleToggle = () => setIsOpen(!isOpen);
    const closeSideBar = () => setIsOpen(false);

    const handleProfileToggle = () => setIsProfileOpen(!isProfileOpen);
    const closeProfile = () => setIsProfileOpen(false);

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (current_user) {
            navigate("/entries"); 
        } else {
            navigate("/"); 
        }
        closeSideBar();
    };

    // Detect clicks outside the menu or profile to close them
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {isOpen && <div className="menu-overlay" onClick={closeSideBar}></div>}

            <div className="nav">
                <div className="menu-icon" onClick={handleToggle}>
                    <span className="material-symbols-outlined">
                        {isOpen ? "close" : "menu"}
                    </span>
                </div>

                <div className="logo-image">
                    <Link to="/" onClick={handleLogoClick}>
                        <img
                            src={logo}
                            alt="Sumi Logo of a black cat"
                            className="sumi-image"
                        />
                    </Link>
                </div>

                <div className="right-icons">
                    <div className="profile-container" ref={profileRef}>
                        <span
                            className="material-symbols-outlined"
                            onClick={handleProfileToggle}
                        >
                            account_circle
                        </span>
                        <div className={`profile-dropdown ${isProfileOpen ? "active" : ""}`}>
                            {current_user ? (
                                <>
                                    <Link to="/profile" onClick={closeProfile}>
                                        Profile
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            logout();
                                            closeProfile();
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" onClick={closeProfile}>
                                        Register
                                    </Link>
                                    <Link to="/login" onClick={closeProfile}>
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`nav-menu ${isOpen ? "active" : ""}`} ref={menuRef}>
                <ul className="nav-links">
                    {current_user ? (
                        <>
                            <li>
                                <Link to="/entries" onClick={closeSideBar} className="navbar-link navbar-link-active">
                                    My entries
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" onClick={closeSideBar} className="navbar-link">
                                    Profile
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/register" onClick={closeSideBar} className="navbar-link">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={closeSideBar} className="navbar-link">
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
}
