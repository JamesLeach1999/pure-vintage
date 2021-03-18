import React, {useState, useContext, useEffect} from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ImageInput,
  ImageField,
  AutocompleteInput,
  Loading,
  Error,
  DataProviderContext
} from "react-admin";
import { Dialog, withStyles } from "@material-ui/core";

const AutocompleteInputInDialog = withStyles({
  suggestionsContainer: { zIndex: 2000 },
})(AutocompleteInput);

const brandChoices = [
  { brand: "north" },
  { brand: "adidas" },
  { brand: "nike" },
];
const catChoices = [
  { cat: "shirts" },
  { cat: "puffer" },
  { cat: "fleeces" }
];
const sizeChoices = [
  { size: "L" },
  { size: "XL" },
  { size: "M" }
];

const ProductEdit = (props) => {
   const dataProvider = useContext(DataProviderContext);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        dataProvider.getOne('users', { id: userId })
            .then(({ data }) => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);
  return (
    <Edit title="eid t post" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput multiline source="description" />

        <AutocompleteInputInDialog source="brand" choices={brandChoices} setProductObject />
        <AutocompleteInputInDialog source="category" choices={catChoices} />
        <AutocompleteInputInDialog source="size" choices={sizeChoices} />
        <ImageInput
          source="/products"
          multiple="true"
          label="Related pictures"
          accept="image/*"
        >
          <ImageField source="image" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
