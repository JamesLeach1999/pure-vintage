import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";
const PostList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
        <TextField source="description" />
        <EditButton basePath="/store1.names" />
        <DeleteButton basePath="/store1.names" />
      </Datagrid>
    </List>
  );
};

export default PostList;
