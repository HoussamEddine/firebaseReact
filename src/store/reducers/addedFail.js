const addedFail = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADDEDD_Fail":
      return { ...action.payload };
  }
  return newState;
};

export default addedFail;
