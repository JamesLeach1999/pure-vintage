import * as React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-json-server";
import ProductList from "./ProductList"
const dataProvider = restProvider(
  "https://cryptic-temple-54361.herokuapp.com/"
);
function AdminPage() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="store1"
        list={ProductList}
        
      />
    </Admin>
  );
}

export default AdminPage;
