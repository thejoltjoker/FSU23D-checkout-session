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
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const TextField = ({
  label,
  description,
  placeholder,
  errorMessage,
  ...props
}: TextFieldProps) => {
  return (
    <RACTextField {...props}>
      <Label>{label}</Label>
      <Input
        className="h-12 w-full rounded-full border-[1.5px] border-brown-950/40 px-4 placeholder:text-brown-950/20 focus:border-banana-500 focus:ring-banana-500 disabled:border-brown-950/20 disabled:text-brown-950/20"
        placeholder={placeholder}
      />
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
};

export default TextField;
