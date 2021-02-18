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

  if (action.type === "SET_SUMS") {
    var it = [];
    var sumPrice = [];
    var sum1;
    var idk = [];
    console.log(action.payload);

    for (var i = 0; i < action.payload.length; i++) {
      console.log("for loop i");
      console.log(action.payload[i]);

      var items = JSON.parse(action.payload[i].orderItems);
      console.log(items)
      for (var j = 0; j < items.length; j++) {
        console.log("for loop j");

        console.log(items[j]);
        console.log(items[j].product);
        idk.push(items[j].product.price)
      }
      sum1 = idk.reduce(function (a, b) {
        return a + b;
      }, 0);
          console.log(sum1);

    }
    console.log(sum1)
    action.payload.map((items) => {
      console.log("reducer items");
      console.log(items);
      it.push(JSON.parse(items.orderItems));
      console.log(it);
      it.map((price) => {
        //   console.log(price);
        var t = [];
        price.map((r) => {
          t.push(r.product.price);
          console.log(t);
        });
        sum1 = t.reduce(function (a, b) {
          return a + b;
        }, 0);
        //   console.log(sum1);
        t = [];
      });
      sumPrice.push(sum1);
      console.log(sumPrice)
    });

    return { ...state, sum: sumPrice };
  }
  if (action.type === "GET_ORDERS") {
    const orderJson = action.payload;
    var allOrders = [];
    orderJson.map((order) => {
      //   console.log(order);
      if (order !== null) {
        allOrders.push(order);
      }
    });
    // only focus on the people bit
    return { ...state, data: allOrders };
  }

  if (action.type === "ORDER_ITEMS") {
    const orderData = action.payload;
    var orderProductData = [];
    for (var i = 0; orderData.length > i; i++) {
      var orderArray = JSON.parse(orderData[i].orderItems[0]);
      console.log(orderArray);
      for (var j = 0; orderArray.product.length > j; j++) {
        console.log(orderArray.product[j]);
      }
    }
    //   if(orderArray.length > 0){
    //     for(var i = 0; orderArray.length > i; i++){
    //         orderArrayData.push(orderArray[i])
    //     }
    //   }
    //   console.log(orderArrayData)

    return { ...state, orders: [] };
  }
  // have as many different action types as you want. each different action type
  // returs a different updated state, so all updates in one place

  // could just return state but probably better is throw an error
  throw new Error(" no matching action ");
  // if you dont return state from the function then the state.isModalOpen etc below wont make sense
};

export default reducer;
