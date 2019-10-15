const getSujetsPlReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUJETSPL_READY":
      // console.log(action.payload, "action");
      return { ...action.payload };
  }
  return state;
};

export default getSujetsPlReducer;
