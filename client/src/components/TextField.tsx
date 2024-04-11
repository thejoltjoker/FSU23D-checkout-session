import type {
  TextFieldProps as RACTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import {
  FieldError,
  Input,
  Label,
  TextField as RACTextField,
  Text,
} from "react-aria-components";

interface TextFieldProps extends RACTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const TextField = ({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) => {
  return (
    <RACTextField {...props}>
      <Label>{label}</Label>
      <Input />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
};

export default TextField;
