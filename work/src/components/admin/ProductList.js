import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
const ProductList = (props) => {
  console.log(props);
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="category" />
        <TextField source="brand" />
        <EditButton basePath="/posts" />

        <DeleteButton basePath="/posts" />
      </Datagrid>
    </List>
  );
};

export default ProductList;
