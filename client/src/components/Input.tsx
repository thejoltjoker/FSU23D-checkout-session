type Props = {
  className?: string;
  type: string;
  name: string;
  id: string;
  value?: string;
  onChange?: () => void;
  placeholder?: string;
};

const Input = (props: Props) => {
  return (
    <input
      className={
        "h-12 rounded-full border-dawn-400 px-5 placeholder:text-sm placeholder:text-dawn-400 " +
        props.className
      }
      type={props.type}
      name={props.name}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
