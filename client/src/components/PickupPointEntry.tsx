import axios from "axios";
import { useState } from "react";

import { Coupon } from "../models/Coupon";
import { Button } from "./Button";
import PostalCodeInput from "./PostalCodeInput";

type Props = {
  setPickupPoint: (coupon: Coupon) => void;
};

const PickupPointEntry = ({ setPickupPoint: setCoupon }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleApplyCode = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<Coupon>(
        `http://localhost:3000/api/delivery/service-points/${encodeURIComponent(inputValue)}`,
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
      <PostalCodeInput
        postalCode={inputValue}
        setPostalCode={(value) => setInputValue(value)}
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

export default PickupPointEntry;
