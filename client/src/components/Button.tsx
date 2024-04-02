import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const className =
    "h-12 rounded-full bg-fern-500 px-3 font-bold text-white " +
    props.className;
  return (
    <button
      className={className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled ?? false}
    >
      {props.children}
    </button>
  );
};

export default Button;
