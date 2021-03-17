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
  console.log(props)
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        
        <EditButton basePath="/posts" />
      </Datagrid>
    </List>
  );
};

export default PostList;
