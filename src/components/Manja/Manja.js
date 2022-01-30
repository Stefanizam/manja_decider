import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import returnDateFormat from "../../helpers/returnDateFormat"
import { timeSince } from "../../helpers/timeSince";

export const Manja = (props) => {
    const dispatch = useDispatch();
    const selectedManja = useSelector(theState => theState.selectedManja);
    const manja = { ...props.theManja };
    const isCurrentManja = selectedManja.id === manja.id ? true : false;
    const [hovered, setHovered] = useState(false);

    const colorDecider = (theDate) => {
        const calculatedColor = new Date(theDate)
        return timeSince(calculatedColor)
    }

    const setSelectedManja = (item) => {
        dispatch({ type: "SET_SELECTED_MANJA", payload: item })
    }

    const eatToday = (e, theManja) => {
        e.stopPropagation();
        const updatedManja = { ...theManja, newDate: new Date().toISOString() };
        dispatch({ type: "SET_SELECTED_MANJA", payload: updatedManja });
        props.updateManjas(updatedManja, "eatToday");
    }

    return (
        <div className="d-flex">
            <div onClick={() => setSelectedManja(manja)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`manja-content d-flex rounded border mb-3 p-3 ${isCurrentManja ? "selected-manja" : "bg-white"}`}>
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex">
                        <div
                            className="manja-image"
                            style={{
                                "backgroundImage": `url(${manja.imageUrl})`,
                                border: `2px solid ${colorDecider(manja.newDate, "shadow")}`,
                                transform: `${hovered === true ? "scale(2, 2)" : "unset"}`,
                                zIndex: `${hovered === true ? '15' : "unset"}`
                            }}
                        >
                            {
                                manja.imageUrl === "" &&
                                <i className="bi bi-images p-1"></i>
                            }
                        </div>
                        <div className="d-flex flex-column">
                            <h4 className="mb-0"><b>{manja.name}</b></h4>
                            <div className="d-flex flex-column">
                                <small className={`${isCurrentManja ? "text-white" : "text-secondary"}`}>{manja.description}</small>
                                <div className="d-flex">
                                    <small className={`${isCurrentManja ? "text-white" : "text-secondary"}`}>Датум на консумпција: {returnDateFormat(manja.newDate)}</small>
                                    <span className="time-badge mx-1" style={{ backgroundColor: colorDecider(manja.newDate) }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isCurrentManja &&
                        <div className="d-flex flex-column-reverse">
                            <button type="button" className="btn btn-primary h-50 bg-white text-primary" onClick={e => eatToday(e, manja)}>Eat today!</button>
                        </div>
                    }
                </div>
            </div >
            {
                isCurrentManja &&
                <div className="manja-options">
                    <button onClick={props.deleteManja} className="bg-white text-danger manja-opt-btn"><i className="bi bi-trash-fill"></i></button>
                    <button onClick={props.editManja} className="bg-white text-secondary manja-opt-btn"><i className="bi bi-pencil-square"></i></button>
                </div>
            }
        </div >
    )
}  