const authSuccess = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuth: action.isAuth, error: action.error };
    // default:
    //   return { ...state, isAuth: false };
  }
  return newState;
};

export default authSuccess;
