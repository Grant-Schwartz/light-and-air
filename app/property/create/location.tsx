import { Property } from "@/utils/models";
import { Input } from "@chakra-ui/input";
import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { FormLayout, SearchInput } from "@saas-ui/react";
import { Dispatch, SetStateAction, FC } from "react";

interface PropertyLocationProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

export const PropertyLocation: FC<PropertyLocationProps> = ({
  step,
  setStep,
  property,
  setProperty,
}) => {
  const registerLocationChange = (val: string, key: string) => {
    const prevProperty = { ...property };
    (prevProperty as any).location[key] = val;
    setProperty(prevProperty);
  };
  return (
    <FormLayout>
      <FormControl>
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          value={property.location.address}
          onChange={(e) => registerLocationChange(e.target.value, "address")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>City</FormLabel>
        <Input
          type="text"
          value={property.location.city}
          onChange={(e) => registerLocationChange(e.target.value, "city")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>State</FormLabel>
        <Input
          type="text"
          value={property.location.state}
          onChange={(e) => registerLocationChange(e.target.value, "state")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Zipcode</FormLabel>
        <Input
          type="text"
          value={property.location.zipcode}
          onChange={(e) => registerLocationChange(e.target.value, "zipcode")}
        />
      </FormControl>
    </FormLayout>
  );
};
