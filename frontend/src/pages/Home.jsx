import React from "react";
import cooquieHome from "../assets/cooquieHome.png";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div className="home">
            <div className="hero">
            <div className="hero-content">
                <img 
                src={cooquieHome} 
                alt="An image of drawn cats"
                className="hero-image"
                />
                <h1 className="hidden">Write your daily<br></br> journal with Cooquie </h1>
                <p className="hidden"> Capture moments, Grow within by documenting your life<br></br> with our online journal, Cooquie. 
                </p>
                <Link to="/register" className="btn hidden">Get Started</Link>
                <div className="p-hidden">
                     <p> Designed with a simple interface, each entry<br></br> becomes part of your journey towards self-growth<br></br> with privacy and security.
                </p>
                </div>
            </div>   
            </div>
        </div>
    )
}