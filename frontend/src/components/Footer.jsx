import React from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // ---> import for FontAwesomeIcon
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // ---> import the icons

export default function Footer() {
    return(
        <div className="footer">
           <img
            src={logo}
            alt="Sumi Logo of a black cat"
            className="sumi-image"
            />
            <div className="social-icons">
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/marion-nabulobi-a7aa5b344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
    )
}