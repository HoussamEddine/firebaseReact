export const auth = (bool, err) => {
  return dispatch => {
    dispatch({
      type: "AUTH",
      isAuth: bool,
      error: err
    });
  };
};
