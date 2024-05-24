import "./IndexFeature.scss";
import {useState} from "react";

function IndexFeature({img, title, text}) {
    return(
        <div className="flexContainer IndexFeature">
            <img src={img} alt=""/>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
}

export default IndexFeature;
