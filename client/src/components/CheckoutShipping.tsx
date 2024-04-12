import axios from "axios";
import { useState } from "react";

import { Form } from "react-aria-components";
import { ServicePoint } from "../models/ServicePoint";
import { Button } from "./Button";
import ServicePointSelection from "./ServicePointSelection";
import TextField from "./TextField";

type Props = {
  servicePoint: ServicePoint | undefined;
  setServicePoint: (servicePoint: ServicePoint) => void;
};

const CheckoutShipping = ({ servicePoint, setServicePoint }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [servicePoints, setServicePoints] = useState<ServicePoint[]>();
  const [postalCode, setPostalCode] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get<ServicePoint[]>(
        `http://localhost:3000/api/shipping/service-points/${encodeURIComponent(postalCode)}`,
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
    <div className="rounded-3xl bg-banana-50 p-8">
      <h4 className="text-2xl">Shipping</h4>
      <p className="pb-4 text-brown-950/60">
        Enter your postal code to find the nearest service point.
      </p>
      <div className="flex w-full flex-wrap gap-2">
        <Form
          className="flex w-full flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={postalCode}
            onChange={(e) => setPostalCode(e)}
            placeholder="12345"
            className={"shrink grow"}
          />

          <Button
            type="submit"
            isDisabled={isLoading}
            className="min-w-24 shrink grow"
          >
            Search
          </Button>
        </Form>
        {isError && <p className="w-full">Something went wrong</p>}
      </div>

      {servicePoints && (
        <div className="pt-4">
          <ServicePointSelection
            servicePoints={servicePoints}
            servicePoint={servicePoint}
            setServicePoint={setServicePoint}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutShipping;
