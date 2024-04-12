import axios from "axios";
import { useState } from "react";

import { Form } from "react-aria-components";
import { Coupon } from "../models/Coupon";
import { Button } from "./Button";
import TextField from "./TextField";

type Props = {
  setCoupon: (coupon: Coupon) => void;
};

const PromotionEntry = ({ setCoupon }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleApplyCode = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<Coupon>(
        `http://localhost:3000/api/products/promotions/check/${encodeURIComponent(inputValue)}`,
        { withCredentials: true },
      );
      if (response.status === 200 && response.data.id) {
        setCoupon(response.data);
        setIsValid(true);
      }

      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        className="flex w-full flex-row gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleApplyCode();
        }}
      >
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          isDisabled={isValid}
          className={"shrink grow"}
        />
        {isValid ? null : (
          <Button
            type="submit"
            onPress={() => handleApplyCode()}
            isDisabled={isLoading}
            className="min-w-24 shrink grow"
          >
            Apply
          </Button>
        )}
      </Form>
      {isError && <p className="w-full pt-2">Invalid code</p>}
    </>
  );
};

export default PromotionEntry;
