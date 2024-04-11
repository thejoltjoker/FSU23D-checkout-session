import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

export interface ButtonProps extends RACButtonProps {
  variant?: "primary";
}

const button = tv({
  extend: focusRing,
  base: "px-5 h-12 text-center transition rounded-lg cursor-default font-heading text-lg",
  variants: {
    variant: {
      primary:
        "rounded-full bg-banana-500 px-3 font-bold text-brown-800 hover:bg-banana-600",
    },
    isDisabled: {
      true: "bg-gray-100 dark:bg-zinc-800 text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText] border-black/5 dark:border-white/5",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const Button = (props: ButtonProps) => {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant: props.variant, className }),
      )}
    />
  );
};

export default Button;
