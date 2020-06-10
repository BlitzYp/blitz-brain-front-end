import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className= "f3">
                {"Sensei Wu is a face finding master! Can you outsmart Wu?"}
            </p>
            <div className= "center">
                <div className ="form center pa4 br3 shadow-5">
                    <input className = "f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className ="w-30 grow f4 link pv2 ph3 pv2 dib orange bg-light-green" onClick = {onButtonSubmit}>Detect</button>
                </div>             
            </div>
        </div>
    )
}

export default ImageLinkForm;