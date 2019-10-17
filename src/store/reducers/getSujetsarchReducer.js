const getSujetsarchReducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "SUJETSARCH_READY":
      return { ...action.payload, archId: action.ArchId };
  }
  return newState;
};
export default getSujetsarchReducer;
