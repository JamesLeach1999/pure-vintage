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
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="publishedAt" />
      </Datagrid>
    </List>
  );
};

export default PostList;
