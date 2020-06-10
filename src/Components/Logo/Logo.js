import React from "react";
import Tilt from 'react-tilt';
import "./Logo.css"
import Sensei_wu from "./Sensei_wu.png";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow" options={{ max: 56 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner p3">
                    <img style={{paddingTop: "5px"}} alt="logo" src={Sensei_wu}/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;