"use client";

import { PropertyData } from "@/utils/PropertyContext";
import {
  Box,
  Heading,
  Flex,
  Center,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SelectPropertyType } from "./type";
import { PropertyLocation } from "./location";
import { PropertyAnalysis } from "./analysis";
import Link from "next/link";

export default function CreateProperty() {
  const { property, setProperty } = useContext(PropertyData);
  const [step, setStep] = useState<number>(0);
  return (
    <Flex marginTop="40px" justifyContent="center">
      <VStack justifyContent="center">
        <Heading>Create a project</Heading>
        <Heading fontFamily="mono" textTransform="uppercase" size="md">
          {
            {
              0: "Property Type",
              1: "Property Location",
              2: "Analysis Details",
            }[step]
          }
        </Heading>
        <Box marginTop="20px" w="100%">
          {
            {
              0: (
                <SelectPropertyType
                  step={step}
                  setStep={setStep}
                  property={property}
                  setProperty={setProperty}
                />
              ),
              1: (
                <PropertyLocation
                  step={step}
                  setStep={setStep}
                  property={property}
                  setProperty={setProperty}
                />
              ),
              2: (
                <PropertyAnalysis
                  step={step}
                  setStep={setStep}
                  property={property}
                  setProperty={setProperty}
                />
              ),
            }[step]
          }
        </Box>
        {step > 0 && (
          <Flex justifyContent="space-between" w={500} marginTop={5}>
            <Button onClick={() => setStep(step - 1)} justifySelf="flex-end">
              Back
            </Button>
            {step !== 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                justifySelf="flex-end"
                variant="secondary"
              >
                Next
              </Button>
            ) : (
              <Button
                as={Link}
                href="/property"
                justifySelf="flex-end"
                variant="secondary"
              >
                Next
              </Button>
            )}
          </Flex>
        )}
      </VStack>
    </Flex>
  );
}
