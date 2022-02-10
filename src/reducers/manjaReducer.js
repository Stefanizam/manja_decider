const initialState = {
  showEditManjaModal: {
    show: false,
    type: ""
  },
  selectedManja: {
    name: "",
    id: "",
    description: "",
    newDate: "",
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
          imageUrl: action.payload.imageUrl
        }
      }
    case "SHOW_MANJA_MODAL":
      return state = {
        ...state,
        showEditManjaModal: { ...action.payload },
      }
    default:
      return state;
  }

}