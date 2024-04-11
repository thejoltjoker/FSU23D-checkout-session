import {
  FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text,
  TextProps,
  composeRenderProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

export function Label(props: LabelProps) {
  return (
    <RACLabel
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-gray-500 dark:text-zinc-400",
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-gray-600", props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <RACFieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600 forced-colors:text-[Mark]",
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false:
        "border-brown-950/20 dark:border-zinc-500 forced-colors:border-[ButtonBorder]",
      true: "border-brown-950/30 dark:border-zinc-300 forced-colors:border-[Highlight]",
    },
    isInvalid: {
      true: "border-red-600 dark:border-red-600 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-brown-950/10 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center bg-white dark:bg-zinc-900 forced-colors:bg-[Field] border-2 rounded-full overflow-hidden h-12",
  variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <RACInput
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-brown-950/60 disabled:text-brown-950/10 min-w-0 flex-1 bg-white px-2 py-1.5 text-sm outline outline-0 dark:bg-zinc-900 dark:text-zinc-200 dark:disabled:text-zinc-600",
      )}
    />
  );
}
