import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface NumberPointProps {
  number: number;
  heading: string;
  subtext: string;
  fill: boolean;
}

export const NumberPoint: FC<NumberPointProps> = ({
  number,
  heading,
  subtext,
  fill,
}) => {
  return (
    <HStack marginTop="20px" marginBottom="20px">
      <Flex
        borderRadius="50%"
        bgColor={fill === true ? "primary" : "secondary"}
        border="1px solid"
        borderColor="primary"
        w="50px"
        h="50px"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color={fill === false ? "primary" : "secondary"}
          fontFamily="mono"
          fontSize="2xl"
        >
          {number}
        </Text>
      </Flex>
      <VStack gap={0} alignItems="flex-start">
        <Text
          fontFamily="mono"
          fontWeight="100"
          fontSize="xl"
          marginBottom="-5px"
        >
          {heading}
        </Text>
        <Text>{subtext}</Text>
      </VStack>
    </HStack>
  );
};
