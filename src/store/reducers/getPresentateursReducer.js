const getPresentateursReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "PRESENTATEURS_READY":
      return { ...action.payload };
  }
  return newState;
};

export default getPresentateursReducer;
