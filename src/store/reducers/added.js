const added = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "ADDED_STATE":
      return { ...action };
  }
  return newState;
};

export default added;
