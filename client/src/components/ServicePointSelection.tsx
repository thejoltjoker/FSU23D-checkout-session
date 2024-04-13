import {
  FieldError,
  Label,
  Radio,
  RadioGroup,
  Text,
} from "react-aria-components";
import { ServicePoint } from "../models/ServicePoint";

interface ServicePointSelectionProps {
  servicePoints: ServicePoint[];
  servicePoint: ServicePoint | undefined;
  setServicePoint: (ServicePoint: ServicePoint) => void;
}

const ServicePointSelection = ({
  servicePoints,
  servicePoint,
  setServicePoint,
}: ServicePointSelectionProps) => {
  return (
    <RadioGroup
      className="flex flex-col"
      value={servicePoint?.servicePointId}
      onChange={(value) => {
        const newSp = servicePoints.find((sp) => sp.servicePointId === value);
        if (newSp) {
          setServicePoint(newSp);
        }
      }}
    >
      <Label className="pb-2 text-brown-950/60">Select a service point:</Label>
      {servicePoints.map((sp) => (
        <Radio
          value={sp.servicePointId}
          className="flex items-center gap-2 font-heading text-xl font-bold uppercase transition-all before:block before:size-5 before:rounded-full before:border-1.5 before:border-brown-950/40 before:bg-white data-[selected]:before:border-6 data-[selected]:before:border-banana-500 data-[selected]:before:bg-banana-200"
        >
          <span className="flex flex-col">
            <span>{sp.name}</span>
            <span className="font-sans text-sm normal-case text-brown-950/60">
              {sp.deliveryAddress.streetName} {sp.deliveryAddress.streetNumber},{" "}
              {sp.deliveryAddress.postalCode} {sp.deliveryAddress.city}
            </span>
          </span>
        </Radio>
      ))}
      <Text slot="description" />
      <FieldError />
    </RadioGroup>
  );
};

export default ServicePointSelection;
