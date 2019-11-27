const getSujetsarchReducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "SUJETSARCH_READY":
      return { ...action.data.payload, archId: action.data.Id };
  }
  return newState;
};
export default getSujetsarchReducer;
