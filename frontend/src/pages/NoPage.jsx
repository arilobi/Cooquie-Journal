import React from "react";
import { useNavigate } from "react-router-dom";

export default function NoPage() {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate("/");
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            {/* Face */}
            <div style={{
                width: "300px",
                height: "300px",
                border: "4px solid #383838",
                borderRadius: "10px",
                backgroundColor: "white",
                margin: "0 auto",
                marginTop: "100px",
                position: "relative"
            }}>
                {/* Band */}
                <div style={{
                    width: "350px",
                    height: "27px",
                    border: "4px solid #383838",
                    borderRadius: "5px",
                    marginLeft: "-25px",
                    marginTop: "50px",
                    position: "relative"
                }}>
                    <div style={{
                        height: "33.33%",
                        width: "100%",
                        backgroundColor: "#E53D3D"
                    }}></div>
                    <div style={{
                        height: "33.33%",
                        width: "100%",
                        backgroundColor: "white"
                    }}></div>
                    <div style={{
                        height: "33.33%",
                        width: "100%",
                        backgroundColor: "#4679BD"
                    }}></div>
                    
                    {/* Band before pseudo-element */}
                    <div style={{
                        content: "",
                        height: "27px",
                        width: "30px",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 999
                    }}></div>
                    
                    {/* Band after pseudo-element */}
                    <div style={{
                        content: "",
                        height: "27px",
                        width: "30px",
                        backgroundColor: "rgba(56,56,56,0.3)",
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 999
                    }}></div>
                </div>
                
                {/* Eyes */}
                <div style={{
                    width: "128px",
                    margin: "0 auto",
                    marginTop: "40px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                        width: "30px",
                        height: "15px",
                        border: "7px solid #383838",
                        borderTopLeftRadius: "22px",
                        borderTopRightRadius: "22px",
                        borderBottom: "0"
                    }}></div>
                    <div style={{
                        width: "30px",
                        height: "15px",
                        border: "7px solid #383838",
                        borderTopLeftRadius: "22px",
                        borderTopRightRadius: "22px",
                        borderBottom: "0"
                    }}></div>
                </div>
                
                {/* Dimples */}
                <div style={{
                    width: "180px",
                    margin: "0 auto",
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(229, 61, 61, 0.4)"
                    }}></div>
                    <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(229, 61, 61, 0.4)"
                    }}></div>
                </div>
                
                {/* Mouth */}
                <div style={{
                    width: "40px",
                    height: "5px",
                    borderRadius: "5px",
                    backgroundColor: "#383838",
                    margin: "0 auto",
                    marginTop: "25px"
                }}></div>
            </div>

            <h1 style={{
                fontWeight: 800,
                color: "#383838",
                textAlign: "center",
                fontSize: "2.5em",
                paddingTop: "20px"
            }}>
                Oops! Something went wrong!
            </h1>
            
            <div 
                style={{
                    fontFamily: "Sono",
                    fontWeight: 400,
                    padding: "20px",
                    backgroundColor: "#F69FBC",
                    border: "2px solid black",
                    color: "black",
                    width: "320px",
                    margin: "0 auto",
                    textAlign: "center",
                    fontSize: "1.2em",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "80px",
                    marginBottom: "50px",
                    transition: "all .2s linear"
                }}
                onClick={handleReturnHome}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#000";
                    e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#F69FBC";
                }}
            >
                Return to Home
            </div>
        </div>
    );
}