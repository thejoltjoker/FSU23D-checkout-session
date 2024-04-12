import TextField from "./TextField";

// import { Input, Label, TextField } from "react-aria-components";
type Props = {
  postalCode: string;
  setPostalCode: (value: string) => void;
};

const PostalCodeInput = ({ postalCode, setPostalCode }: Props) => {
  return (
    <TextField value={postalCode} onChange={(str) => setPostalCode(str)} />
  );
};

export default PostalCodeInput;
