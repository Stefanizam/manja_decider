import React, { useState } from "react";
import returnDateFormat from "../../helpers/returnDateFormat"

export const Manja = (props) => {
    const [manja, setManja] = useState({ ...props.theManja })

    const colorDecider = (theManja) => {
        return "4px solid rgb(200,200,200)"
    }

    const clickManja = () => {

    }

    return (
        <div onClick={clickManja} style={{ "border": colorDecider(manja) }} className="manja-container mb-3 p-3">
            <div style={{ "backgroundImage": `url(${manja.imageUrl})` }} className="manja-image"></div>
            <div className="d-flex flex-column ">
                <h4 className="mb-0"><b>{manja.name}</b></h4>
                <div className="d-flex flex-column">
                    <small className="text-secondary align-top">{manja.description}</small>
                    <small className="text-secondary">Датум на консумпција: {returnDateFormat(manja.newDate)}</small>
                </div>
            </div>
        </div>
    )
}  