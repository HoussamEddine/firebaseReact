const Login = (state = "", action) => {
  switch (action.type) {
    case "loggedIn":
      return action.value;
    default:
      return state;
  }
};

export default Login;
