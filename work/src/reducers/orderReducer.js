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

    for (var i = 0; i < action.payload.length; i++) {
      console.log("for loop i");

      if (action.payload[i].orderItems) {
        var items = JSON.parse(action.payload[i].orderItems);

        for (var j = 0; j < items.length; j++) {
          console.log("for loop j");

          idk.push(items[j].product.price);
        }
        sumPrice = idk.reduce(function (a, b) {
          return a + b;
        }, 0);
        
      } else {
        continue;
      }

    }
    

    return { ...state, sum: idk };
  }
  if (action.type === "GET_ORDERS") {
    const orderJson = action.payload;
    var allOrders = [];
    orderJson.map((order) => {
      if (order !== null) {
        allOrders.push(order);
      }
    });
    // only focus on the people bit
    return { ...state, data: allOrders };
  }
  
  if (action.type === "GET_IMAGES") {

    var it = [];
    var sumPrice = [];
    var sum1;
    var idk1 = [];
    for (var i = 0; i < action.payload.length; i++) {
      console.log("for loop i");
      

      if (action.payload[i].orderItems) {
        var items1 = JSON.parse(action.payload[i].orderItems);

        for (var j = 0; j < items1.length; j++) {
          console.log("for loop j");

          // console.log(items[j]);
          idk1.push(items1[j].product.image[0]);
        }
        

      } else {
        continue;
      }

    }
    // only focus on the people bit
    return { ...state, images: idk1 };
  }

  if (action.type === "ORDER_ITEMS") {
    const orderData = action.payload;
    var orderProductData = [];

    for (var k = 0; orderData.length > k; k++) {
      
      var orderArray = JSON.parse(orderData[k].orderItems[0]);
      for (var l = 0; orderArray.product.length > l; l++) {
        console.log("order items reducer products");
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
