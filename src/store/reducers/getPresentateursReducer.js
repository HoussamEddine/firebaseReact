const getPresentateursReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "PRESENTATEURS_READY":
      return { ...action.data.payload, presentateurId: action.data.Id };
      
  }
  return newState;
};

export default getPresentateursReducer;

