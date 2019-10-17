export const addedSucces = () => {
  return dispatch => {
    dispatch({
      type: "ADDED_SUCCES",
      addedSucces: true,
      message: "Ajouté avec succès"
    });
  };
};
