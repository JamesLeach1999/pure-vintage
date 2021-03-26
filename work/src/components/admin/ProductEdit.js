import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  ImageField,
  ImageInput,
  NumberInput,
} from "react-admin";

const PostEdit = (props) => {
  return (
    <Edit title="eid t post" {...props}>
      <SimpleForm>
        {/* <TextInput disabled source="id" /> */}
        <TextInput source="name" />
        <TextInput source="category" />
        <TextInput source="brand" />
        <TextInput multiline source="description" />
        <DateInput label="Published" source="publishedAt" />
        <BooleanInput label="In Stock" source="inStock" />
        <BooleanInput label="Featured" source="Featured" />
        <ImageInput
          source="images"
          label="Related pictures"
          accept="image/*"
          placeholder={<p>Drop your file here</p>}
        >
          <NumberInput source="price" />
          <ImageField source="images" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
