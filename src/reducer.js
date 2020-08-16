export const initialState = {
  user: null,
  snackbarOpen: "false",
  snackbarType: "success",
  snackbarMessage: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_SNACKBAR: "SET_SNACKBAR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    case actionTypes.SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
      };
    default:
      return state;
  }
};

export default reducer;
