import React from "react";
import { useDispatch } from "react-redux";

export const Header = (props) => {
  const dispatch = useDispatch();

  const showNewManjaModal = () => {
    dispatch({ type: "SHOW_MANJA_MODAL", payload: { show: true, type: "new" } })
  }

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div>
        <h1 className="pt-5 pb-0 mb-0">MANJA DECIDER</h1>
        <h6 className="pb-5">If you cannot decide what should you eat today</h6>
      </div>
      <button className="btn btn-primary h-25" onClick={showNewManjaModal}>
        Add new manja
      </button>
    </div>
  )
}