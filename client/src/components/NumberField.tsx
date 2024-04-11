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
          className="flex h-12 w-12 items-center justify-center rounded-l-full border border-dawn-300 text-xl"
        >
          -
        </Button>
        <Input className="h-12 w-12 border-x-0 border-y border-dawn-300 text-center text-xl" />
        <Button
          slot="increment"
          className="flex h-12 w-12 items-center justify-center rounded-r-full border border-dawn-300 text-xl"
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

{
  /* <div className="flex">
              <RACButton
                className="flex h-12 w-12 items-center justify-center rounded-l-full border border-dawn-300 text-xl"
                onPress={(e) =>
                  setQuantity(quantity - 1 < 0 ? 0 : quantity - 1)
                }
              >
                <span>-</span>
              </RACButton>
              <input
                type="text"
                value={quantity}
                className="h-12 w-12 border-x-0 border-y border-dawn-300 text-center text-xl"
              />
              <RACButton
                className="flex h-12 w-12 items-center justify-center rounded-r-full border border-dawn-300 text-xl"
                onPress={(e) => setQuantity(quantity + 1)}
              >
                +
              </RACButton>
            </div> */
}
