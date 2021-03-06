import styled from "@emotion/styled";

const FormFieldContainer = styled.div`
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
  border-top: 10px solid #ffffff;
  color: #000000;

  &:first-of-type {
    border-top: none;
  }
`;

const Label = styled.label`
  width: 40%;
  min-width: 70px;
  padding: 11px 0;
  color: #000000;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-right: 1px solid #d3d3d3;
`;

const Input = styled.input`
  font-size: 16px;
  width: 100%;
  padding: 11px 15px 11px 8px;
  color: #000000;
  background-color: transparent;
  animation: 1ms void-animation-out;

  &::placeholder {
    color: #000000;
  }
`;

const FormField = ({ label, type, name, placeholder, required }) => {
  return (
    <FormFieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type={type} placeholder={placeholder} required />
    </FormFieldContainer>
  );
};

export default FormField;
