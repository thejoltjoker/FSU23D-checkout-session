import axios from "axios";
import { useState } from "react";

import { ServicePoint } from "../models/ServicePoint";
import TextField from "./TextField";
import { useUserContext } from "../contexts/UserContext";
import { Button } from "./Button";
import ServicePointSelection from "./ServicePointSelection";
import { RadioGroup, Radio, Label, Input } from "react-aria-components";

type Props = {
  servicePoint: ServicePoint | undefined;
  setServicePoint: (servicePoint: ServicePoint) => void;
};

const CheckoutShipping = ({ servicePoint, setServicePoint }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [servicePoints, setServicePoints] = useState<ServicePoint[]>();
  const [postalCode, setPostalCode] = useState<string>("");

  const handleClick = async () => {
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
        Enter your postal code to find a pickup point.
      </p>
      <div className="flex w-full flex-wrap gap-2">
        {/* TODO Save entire address to user */}
        {/* <div className="flex flex-wrap gap-2">
          <TextField
            label="Name"
            value={user && user.name}
            onChange={(value) => user && setUser({ ...user, name: value })}
            className="flex shrink grow basis-2/5 flex-col"
          />
          <TextField
            label="Phone"
            value={(user && user.phone) ?? ""}
            onChange={(value) => user && setUser({ ...user, phone: value })}
            className="flex shrink grow basis-2/5 flex-col"
          />
          <TextField
            label="Street"
            value={(user && user.address?.line1) ?? ""}
            onChange={(value) => user && setUser({ ...user, name: value })}
            className="flex w-full shrink grow flex-col"
          />

          <TextField
            label="Postal code"
            value={(user && user.address?.line1) ?? ""}
            onChange={(e) => setPostalCode(e)}
            className="flex shrink grow basis-2/5 flex-col"
          />
          <TextField
            label="City"
            value={(user && user.address?.line1) ?? ""}
            onChange={(e) => setPostalCode(e)}
            className="flex shrink grow basis-2/5 flex-col"
          />
        </div> */}

        <TextField
          value={postalCode}
          onChange={(e) => setPostalCode(e)}
          placeholder="12345"
        />

        <Button onPress={() => handleClick()} isDisabled={isLoading}>
          Apply
        </Button>

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
