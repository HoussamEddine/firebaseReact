const getSujetsReducer = (state, action) => {
  let newState = { ...state };

  switch (action.type) {
    case "DATA_READY":
      console.log(action);
      return { ...action.data.payload, sujetId: action.data.Id };
  }
  return newState;
};

export default getSujetsReducer;
