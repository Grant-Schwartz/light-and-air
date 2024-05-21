import { Property } from "@/utils/models";
import { Button, Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectPropertyTypeProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

export const SelectPropertyType: FC<SelectPropertyTypeProps> = ({
  step,
  setStep,
  property,
  setProperty,
}) => {
  const submitType = (val: string) => {
    const prevProperty = { ...property };
    (prevProperty as any).property_sub_type = val;
    setProperty(prevProperty);
    setStep(step + 1);
  };
  return (
    <Flex gap="20px">
      <Button
        height={300}
        width={200}
        bgColor="white"
        border="2px solid gray"
        fontSize="xl"
        _hover={{
          bgColor: "secondary",
        }}
        onClick={() => submitType("Apartment")}
      >
        Apartment
      </Button>
      <Button
        height={300}
        width={200}
        bgColor="white"
        border="2px solid gray"
        fontSize="xl"
        _hover={{
          bgColor: "secondary",
        }}
        onClick={() => submitType("Self Storage")}
      >
        Self Storage
      </Button>
      <Button
        height={300}
        width={200}
        bgColor="white"
        border="2px solid gray"
        fontSize="xl"
        _hover={{
          bgColor: "secondary",
        }}
        onClick={() => submitType("Student Housing")}
      >
        Student Housing
      </Button>
      <Button
        height={300}
        width={200}
        bgColor="white"
        border="2px solid gray"
        fontSize="xl"
        _hover={{
          bgColor: "secondary",
        }}
        onClick={() => submitType("Senior Housing")}
      >
        Senior Housing
      </Button>
    </Flex>
  );
};
