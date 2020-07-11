const wantReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_WANT":
      return action.payload;
    default:
      return state;
  }
};

export default wantReducer;
