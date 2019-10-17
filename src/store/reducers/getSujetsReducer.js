const getSujetsReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "DATA_READY":
      return { ...action.payload };
  }
  return newState;
};

export default getSujetsReducer;
