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
          className="flex size-10 items-center justify-center rounded-l-full border-[1.5px] border-brown-950/40 text-xl font-bold text-brown-950/60 md:size-12"
        >
          -
        </Button>
        <Input className="size-10 border-x-0 border-y-[1.5px] border-brown-950/40 p-0 text-center text-lg focus:border-banana-500 focus:ring-banana-500 md:size-12 md:text-xl" />
        <Button
          slot="increment"
          className="flex size-10 items-center justify-center rounded-r-full border-[1.5px] border-brown-950/40 text-xl font-bold text-brown-950/60 md:size-12"
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
