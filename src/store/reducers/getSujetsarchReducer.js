const getSujetsarchReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUJETSARCH_READY":
      return { ...action.payload };
  }
  return state;
};
export default getSujetsarchReducer;
