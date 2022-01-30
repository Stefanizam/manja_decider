import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Manja } from "../Manja/Manja";
import jsonData from "../../dataStorage/theData.json"
import { EditManjaModal } from "../EditManjaModal/EditManjaModal";
import { AreYouSureModal } from "../AreYouSureModal/AreYouSureModal";

export const MainContents = (props) => {
    const dispatch = useDispatch();
    const [allManjas, setAllManjas] = useState([...jsonData]);
    const [sortManjas, setSortManjas] = useState(true);
    const showEditManjaModal = useSelector(theState => theState.showEditManjaModal);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const selectedManja = useSelector(theState => theState.selectedManja);

    // Sort manjas by newDate
    useEffect(() => {
        setSortManjas(false)
        let orderedManjas = [...allManjas];
        orderedManjas.sort((a, b) => {
            return new Date(a.newDate) - new Date(b.newDate);
        });
        setAllManjas(orderedManjas)
    }, [sortManjas])

    const submitManjaHandler = (newManja) => {
        setAllManjas([...allManjas, newManja]);
        setSortManjas(true);
        hideAddNewManjaModal();
    }

    const hideAddNewManjaModal = () => {
        dispatch({ type: "SHOW_MANJA_MODAL", payload: { show: false, type: "" } })
    }

    const editManjaHandler = () => {
        dispatch({ type: "SHOW_MANJA_MODAL", payload: { show: true, type: "edit" } })
    }

    const updateAllManjas = (theManja, type) => {
        let updatedManjas = [...allManjas]
        const theIndex = updatedManjas.findIndex(item => item.id === theManja.id)
        updatedManjas.splice(theIndex, 1)
        if (type === "eatToday" || type === "edit") {
            updatedManjas.push(theManja)
        }
        setAllManjas(updatedManjas);
        dispatch({ type: "SET_SELECTED_MANJA", payload: { name: "", id: "", description: "", newDate: "", imageUrl: "" } })
        setSortManjas(true);
        if (type === "delete") {
            setShowDeleteModal(false)
        } else if (type === "edit") {
            dispatch({ type: "SHOW_MANJA_MODAL", payload: { show: false, type: "" } })
        }
    }

    return (
        <React.Fragment>
            {
                showEditManjaModal.show === true &&
                <EditManjaModal submitManja={submitManjaHandler} hideModal={hideAddNewManjaModal} modalType={showEditManjaModal.type} updateExistingManja={updateAllManjas} />
            }
            {
                showDeleteModal &&
                <AreYouSureModal manjaName={selectedManja.name} hideModal={() => setShowDeleteModal(false)} confirmDelete={updateAllManjas} />
            }
            <div className="d-flex justify-content-center mt-5">
                <div className="main-container rounded">
                    {allManjas.map((item) => {
                        return <Manja theManja={item} key={item.id} updateManjas={updateAllManjas} editManja={editManjaHandler} deleteManja={() => setShowDeleteModal(true)} />
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}