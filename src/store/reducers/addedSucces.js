const addedSucces = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADDEDD_SUCCES":
      return { ...action.payload };
  }
  return newState;
};

export default getPresentateursReducer;
