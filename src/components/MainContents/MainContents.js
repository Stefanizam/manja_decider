import React, { useEffect, useState } from "react";

import { Manja } from "../Manja/Manja";
import jsonData from "../../dataStorage/theData.json"

export const MainContents = (props) => {
    const [allManjas, setAllManjas] = useState([]);
    const [sortManjas, setSortManjas] = useState(true);

    // Sort manjas by newDate at start
    useEffect(() => {
        setSortManjas(false)
        let orderedManjas = [...jsonData];
        orderedManjas.sort((a, b) => {
            return new Date(b.newDate) - new Date(a.newDate);
        });
        setAllManjas(orderedManjas)
    }, [sortManjas])

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="main-container rounded">
                {allManjas.map((item) => {
                    return <Manja theManja={item} key={item.id} />
                })}
            </div>
        </div>
    )
}