import React from "react";
import { useSelector } from "react-redux";

export const AreYouSureModal = (props) => {
  const selectedManja = useSelector(theState => theState.selectedManja);

  return (
    <div className="overlay" onClick={() => props.hideModal()}>
      <div className="modal-contents bg-white rounded" onClick={(e) => { e.stopPropagation() }}>
        <div className="modal-header d-flex justify-content-between p-3 px-4 border-0 border-bottom">
          <h4 className="modal-title">DELETE MANJA</h4>
          <button type="button" className="btn-close" onClick={() => props.hideModal()} aria-label="Close"></button>
        </div>
        <div className="p-5">
          Are you sure you want to delete <strong>{props.manjaName}</strong>?
        </div>
        <div className="modal-footer w-100">
          <button type="button" onClick={() => props.hideModal()} className="btn btn-secondary" >Cancel</button>
          <button type="button" onClick={() => props.confirmDelete(selectedManja, "delete")} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  )
}