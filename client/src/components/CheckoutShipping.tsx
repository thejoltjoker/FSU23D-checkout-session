import axios from "axios";
import { useState } from "react";
import { Button } from "react-aria-components";
import { ServicePoint } from "../models/ServicePoint";
import { TextField } from "./TextField";

type Props = {};

const CheckoutShipping = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [servicePoints, setServicePoints] = useState<ServicePoint[]>();
  const [postalCode, setPostalCode] = useState<string>("");

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<ServicePoint[]>(
        `http://localhost:3000/api/delivery/service-points/${encodeURIComponent(postalCode)}`,
        { withCredentials: true },
      );

      if (response.status === 200) {
        setServicePoints(response.data);
        setIsError(false);
      }

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-banana-50 rounded-3xl p-8">
      <h4 className="text-2xl">Shipping</h4>
      <p className="text-brown-950/60 pb-4">
        Enter your postal code to find a pickup point.
      </p>
      <div className="flex w-full flex-wrap gap-2">
        <TextField value={postalCode} onChange={(e) => setPostalCode(e)} />

        <Button onPress={() => handleClick()} isDisabled={isLoading}>
          Apply
        </Button>

        {isError && <p className="w-full">Something went wrong</p>}
      </div>
      <ul>{servicePoints?.map((sp) => <p>{sp.name}</p>)}</ul>
    </div>
  );
};

export default CheckoutShipping;
