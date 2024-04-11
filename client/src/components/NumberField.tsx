import type { NumberFieldProps, ValidationResult } from "react-aria-components";
import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField as RACNumberField,
  Text,
} from "react-aria-components";

interface MyNumberFieldProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function NumberField({
  label,
  description,
  errorMessage,
  ...props
}: MyNumberFieldProps) {
  return (
    <RACNumberField {...props}>
      <Label>{label}</Label>
      <Group className="flex">
        <Button
          slot="decrement"
          className="border-brown-950/40 text-brown-950/60 flex h-12 w-12 items-center justify-center rounded-l-full border-[1.5px] text-xl font-bold"
        >
          -
        </Button>
        <Input className="focus:border-banana-500 focus:ring-banana-500 border-brown-950/40 h-12 w-12 border-x-0 border-y-[1.5px] text-center text-xl" />
        <Button
          slot="increment"
          className="border-brown-950/40 text-brown-950/60 flex h-12 w-12 items-center justify-center rounded-r-full border-[1.5px] text-xl font-bold"
        >
          +
        </Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACNumberField>
  );
}

export default NumberField;
