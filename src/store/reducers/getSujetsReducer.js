const getSujetsReducer = (state = { val: "val" }, action) => {
  switch (action.type) {
    case "DATA_READY":
      return { ...action.payload };
  }
  return state;
};

export default getSujetsReducer;
