import * as React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-json-server";
import PostList from "./PostList";
// import PostCreate from "./PostCreate";
// import PostEdit from "./PostEdit";
const dataProvider = restProvider(
  "https://cryptic-temple-54361.herokuapp.com/"
);
function AdminPage() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="products"
        list={PostList}
        // create={PostCreate}
        // edit={PostEdit}
      />
    </Admin>
  );
}

export default AdminPage;
