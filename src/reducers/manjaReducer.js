const initialState = {
    showAddManjaModal: false,
    selectedManja: {
        name: "",
        id: "",
        description: "",
        newDate: "",
        oldDate: "",
        imageUrl: ""
    }
}

export const manjaReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_SELECTED_MANJA":
            return state = {
                ...state,
                selectedManja: {
                    name: action.payload.name,
                    id: action.payload.id,
                    description: action.payload.description,
                    newDate: action.payload.newDate,
                    oldDate: action.payload.oldDate,
                    imageUrl: action.payload.imageUrl
                }
            }
        case "SHOW_MANJA_MODAL":
            return state = {
                ...state,
                showAddManjaModal: action.payload.show,
            }
        default:
            return state;
    }

}