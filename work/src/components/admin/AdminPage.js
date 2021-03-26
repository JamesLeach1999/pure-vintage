import React, { useState, useEffect } from "react";

import PostList from "./ProductList";
// import PostCreate from "./PostCreate";
// import PostEdit from "./PostEdit";
import { dataProv } from "./dataProv";
import { showNotification, Admin, Resource } from "react-admin";
// import { push } from "react-router-redux";

const dataProvider = dataProv;

const App = () => {
  console.log(dataProvider);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const h = async () => {
      const t = await dataProvider.getList("store1");
      setNames(t);
    };
    h();
  }, []);
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="store1"
        list={PostList}
        // create={PostCreate}
        // edit={PostEdit}
      />
    </Admin>
  );
};

export default App;
