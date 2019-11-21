export const added = (name, bool, message) => {
  return dispatch => {
    dispatch({
      type: "ADDED_STATE",
      added: bool,
      name: name,
      message: message
    });
  };
};
