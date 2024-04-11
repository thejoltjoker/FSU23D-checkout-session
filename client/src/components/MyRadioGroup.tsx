import type { RadioGroupProps, ValidationResult } from "react-aria-components";
import {
  FieldError,
  Label,
  Radio,
  RadioGroup,
  Text,
} from "react-aria-components";
interface MyRadioGroupProps extends Omit<RadioGroupProps, "children"> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function MyRadioGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: MyRadioGroupProps) {
  return (
    <RadioGroup {...props}>
      <Label>{label}</Label>
      {children}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RadioGroup>
  );
}

export default MyRadioGroup;
