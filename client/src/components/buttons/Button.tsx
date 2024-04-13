import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export interface ButtonProps extends RACButtonProps {
  variant?: "primary";
}

const button = tv({
  base: "px-5 h-12 text-center transition rounded-lg cursor-default font-heading text-lg cursor-pointer",
  variants: {
    variant: {
      primary:
        "rounded-full bg-banana-500 font-bold text-brown-800 hover:bg-banana-600 px-5",
    },
    isDisabled: {
      true: "bg-brown-950/40 text-banana-50/80 hover:bg-brown-950/45 cursor-auto",
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
