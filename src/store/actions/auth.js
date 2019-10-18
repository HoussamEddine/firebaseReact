export const auth = (bool, error) => {
  return dispatch => {
    dispatch({
      type: "AUTH",
      isAuth: bool,
      error: error
    });
  };
};
