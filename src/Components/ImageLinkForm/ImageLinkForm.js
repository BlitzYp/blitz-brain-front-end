import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onFileChange, onButtonSubmit }) => {
    return (
        <div>
            <p className= "f3">
                {"Sensei Wu is a face finding master! Can you outsmart Wu?"}
            </p>
            <div className= "center">
                <div className ="form center pa4 br3 shadow-5">
                    <div className="input-mode input-mode-url">
                        <p className="mode-title ma0 mb2 tl">Option 1: Paste Image URL</p>
                        <div className="url-row">
                            <input
                                className="f4 pa2 center url-input"
                                type="text"
                                placeholder="Paste an image URL"
                                onChange={onInputChange}
                            />
                            <button className ="detect-button grow f4 link pv2 ph3 dib orange bg-light-green" onClick = {onButtonSubmit}>Detect</button>
                        </div>
                    </div>

                    <div className="mode-divider" aria-hidden="true">
                        <span>or</span>
                    </div>

                    <div className="input-mode input-mode-file">
                        <p className="mode-title ma0 mb2 tl">Option 2: Choose Local File</p>
                        <label className="file-picker" htmlFor="image-file-input">
                            <span className="file-picker-label">Select image from your computer</span>
                            <input
                                id="image-file-input"
                                className="file-input"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                        </label>
                        <p className="file-help ma0 mt2 tl">After selecting a file, click Detect.</p>
                        <button className ="detect-button grow f4 link pv2 ph3 dib orange bg-light-green" onClick = {onButtonSubmit}>Detect</button>
                    </div>
                </div>             
            </div>
        </div>
    )
}

export default ImageLinkForm;
