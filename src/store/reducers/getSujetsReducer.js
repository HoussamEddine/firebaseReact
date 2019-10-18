const getSujetsReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "DATA_READY":
      return { ...action.payload, sujetId: action.sujetId };
  }
  return newState;
};

export default getSujetsReducer;
