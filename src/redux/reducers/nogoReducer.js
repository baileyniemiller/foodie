const nogoReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOGO":
      return action.payload;
    default:
      return state;
  }
};

export default nogoReducer;
