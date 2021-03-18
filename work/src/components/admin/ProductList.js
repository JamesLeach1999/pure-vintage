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
        {/* <TextField source="brand" /> */}
        <TextField source="name" />
        
        <EditButton basePath="/store1" />
      </Datagrid>
    </List>
  );
};

export default PostList;
