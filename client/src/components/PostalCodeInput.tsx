import TextField from "./forms/TextField";

// import { Input, Label, TextField } from "react-aria-components";
interface PostalCodeInputProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
}

const PostalCodeInput = ({
  postalCode,
  setPostalCode,
}: PostalCodeInputProps) => {
  return (
    <TextField value={postalCode} onChange={(str) => setPostalCode(str)} />
  );
};

export default PostalCodeInput;
