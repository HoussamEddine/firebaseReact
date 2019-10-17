export const addedFail = () => {
  return dispatch => {
    dispatch({
      type: "ADDED_FAIL",
      addedSucces: false,
      message: "Erreur"
    });
  };
};
