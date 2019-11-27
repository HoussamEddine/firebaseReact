const authSuccess = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "AUTH":
      console.log(action);
      return { ...state, isAuth: action.data.isAuth, error: action.data.error };
  }
  return newState;
};

export default authSuccess;
