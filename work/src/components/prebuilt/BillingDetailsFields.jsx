import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField name="name" label="Name" type="text" required />
      <FormField name="email" label="Email" type="email" required />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="E.g: 123 Fake Street"
        required
      />
      <FormField name="city" label="City" type="text" required />

      <FormField name="zip" label="Postcode" type="text" required />
    </>
  );
};

export default BillingDetailsFields;
