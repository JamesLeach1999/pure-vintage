const reducer = (state, action) => {
  // now ets remove values and close the modal

  // always return some kind of state in reducer
  if (action.type === "ADD_ITEM") {
    // STATE.PEOPLE TO GET PREVIOUS PEOPLE ARRAY VALUES
    const newItems = [...state.people, action.payload];
    // copy values from default state right before the update
    return {
      ...state,
      people: newItems,
      isModalOpen: true,
      modalContent: "item added",
    };
  }

  if (action.type === "NO_ITEM") {
    return {
      // always copy the values
      ...state,
      // still want to keep the people so just dont add anything to it
      isModalOpen: true,
      modalContent: "no item",
    };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  if (action.type === "GET_ORDERS") {
    const orderJson = action.payload;
    var allOrders = []
    orderJson.names.map((order) => {
      // console.log(order);
      if (order !== null) {
        allOrders.push(order);
      }
    });
    // only focus on the people bit
    return { ...state, orders: allOrders };
  }
  // have as many different action types as you want. each different action type
  // returs a different updated state, so all updates in one place

  // could just return state but probably better is throw an error
  throw new Error(" no matching action ");
  // if you dont return state from the function then the state.isModalOpen etc below wont make sense
};

export default reducer;
