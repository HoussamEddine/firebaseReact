const getSujetsPlReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SUJETSPL_READY":
      return { ...action.data.payload, affectId: action.data.Id };
  }
  return newState;
};

export default getSujetsPlReducer;
