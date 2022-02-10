import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import returnDateFormat from "../../helpers/returnDateFormat";

export const EditManjaModal = (props) => {
  const selectedManja = useSelector(theState => theState.selectedManja);
  const [didMount, setDidMount] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    id: "",
    description: "",
    newDate: "",
    imageUrl: ""
  });

  useEffect(() => {
    if (didMount && props.modalType === "edit") {
      setDidMount(false);
      setUserInput({
        name: selectedManja.name,
        id: selectedManja.id,
        description: selectedManja.description,
        newDate: returnDateFormat(selectedManja.newDate),
        imageUrl: selectedManja.imageUrl
      })
    }
  }, [didMount])

  const clickHandler = (e, type) => {
    if (type === "cancel") {
      setUserInput({ name: "", id: "", description: "", newDate: "", imageUrl: "" })
      props.hideModal();
    } else {
      const generatedId = `${Math.floor(Math.random() * 256000).toString()}-${Math.floor(Math.random() * 256000).toString()}-${Math.floor(Math.random() * 256000).toString()}`
      const body = {
        name: userInput.name,
        id: props.modalType === "new" ? generatedId : selectedManja.id,
        description: userInput.description,
        newDate: !userInput.newDate ? new Date().toISOString() : `${userInput.newDate}T12:00:01.911Z`,
        imageUrl: userInput.imageUrl
      }
      if (props.modalType === "new") {
        props.submitManja(body);
      } else if (props.modalType === "edit") {
        props.updateExistingManja(body, "edit");
      }
    }
  }

  const onChangeHandler = (e, type) => {
    setUserInput({ ...userInput, [type]: e.target.value })
  }

  return (
    <div className="overlay" onClick={() => props.hideModal()}>
      <div className="modal-contents bg-white rounded" onClick={(e) => { e.stopPropagation() }}>
        <div className="modal-header d-flex justify-content-between p-3 px-4 border-0 border-bottom">
          <h4 className="modal-title">{props.modalType === "new" ? "Add new manja" : `Edit ${selectedManja.name}`}</h4>
          <button type="button" className="btn-close" onClick={() => props.hideModal()} aria-label="Close"></button>
        </div>
        <form className="px-5 pt-5 pb-3">
          <div className="d-flex justify-content-end mb-2">
            <label htmlFor="manja-name" className="mx-2 text-lg-right">Name:</label>
            <input value={userInput.name} onChange={e => onChangeHandler(e, "name")} id="manja-name" name="manja-name" required={true} autoComplete="off" placeholder="Manja name" />
          </div>
          <div className="d-flex justify-content-end mb-2">
            <label htmlFor="manja-description" className="px-2 text-lg-right">Description:</label>
            <textarea value={userInput.description} onChange={e => onChangeHandler(e, "description")} id="manja-description" name="manja-description" rows={3} required={true} autoComplete="off" placeholder="Manja description" />
          </div>
          {
            props.modalType === "edit" &&
            <div className="d-flex justify-content-end mb-2">
              <label htmlFor="manja-newDate" className="mx-2 text-lg-right">Date:</label>
              <input value={userInput.newDate} onChange={e => onChangeHandler(e, "newDate")} id="manja-newDate" name="manja-newDate" required={false} autoComplete="off" type="date" placeholder="Date of consumption (optional)" />
            </div>
          }
          <div className="d-flex justify-content-end mb-2">
            <label htmlFor="manja-image" className="px-2 text-lg-right">Image:</label>
            <input value={userInput.imageUrl} onChange={e => onChangeHandler(e, "imageUrl")} id="manja-image" name="manja-image" autoComplete="off" placeholder="Paste image URL here" />
          </div>
          <div className="d-flex justify-content-end">
            <label htmlFor="manja-image" className="px-2 text-lg-right">Preview:</label>
            <div style={{ "backgroundImage": `url(${userInput.imageUrl})` }} className="manja-image m-0">{userInput.imageUrl === "" && <i className="bi bi-images p-1"></i>}</div>
          </div>
        </form>
        <div className="modal-footer w-100">
          <button type="button" onClick={e => clickHandler(e, "cancel")} className="btn btn-secondary" >Cancel</button>
          <button type="button" onClick={e => clickHandler(e, "submit")} className="btn btn-primary">{`${props.modalType === "new" ? "Add manja" : "Update manja"}`}</button>
        </div>
      </div>
    </div >
  )
}