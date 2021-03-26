import React, { useState, useEffect } from "react";

import PostList from "./ProductList";
// import PostCreate from "./PostCreate";
// import PostEdit from "./PostEdit";
import { dataProv } from "./dataProv";
import { showNotification, Admin, Resource } from "react-admin";
// import { push } from "react-router-redux";
import {createHashHistory} from "history"
const dataProvider = dataProv;
const history = createHashHistory()
const App = () => {
  console.log(dataProvider);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const h = async () => {
      const t = await dataProvider.getList("products/items");
      setNames(t);
    };
    h();
  }, []);
  return (
    <Admin dataProvider={dataProvider} history={history} style={{fontSize: "200%"}}>
      <Resource
        name="/store/items"
        list={PostList}
        // create={PostCreate}
        // edit={PostEdit}
      />
    </Admin>
  );
};

export default App;
