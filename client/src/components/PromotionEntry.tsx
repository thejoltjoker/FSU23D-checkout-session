import axios from "axios";
import { useState } from "react";

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
    <div className="flex w-full flex-wrap gap-2">
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e)}
        isDisabled={isValid}
        className={"grow"}
      />
      {isValid ? null : (
        <Button onPress={() => handleApplyCode()} isDisabled={isLoading}>
          Apply
        </Button>
      )}
      {isError && <p className="w-full">Invalid code</p>}
    </div>
  );
};

export default PromotionEntry;
