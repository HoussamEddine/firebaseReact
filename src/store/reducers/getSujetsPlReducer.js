const getSujetsPlReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SUJETSPL_READY":
      
      return { ...action.payload, affectId: action.affectId };
  }
  return newState;
};

export default getSujetsPlReducer;
