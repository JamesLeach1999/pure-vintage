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
        {console.log(props)}
      <Datagrid>
        <TextField source="name" />
        <TextField source="description" />
        <h1>yeyeyeyeyey</h1>
      </Datagrid>
    </List>
  );
};

export default PostList;
