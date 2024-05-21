import { Property } from "@/utils/models";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FormLayout } from "@saas-ui/react";
import { Dispatch, SetStateAction, FC } from "react";
import { FiPercent } from "react-icons/fi";

interface PropertyAnalysisProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

export const PropertyAnalysis: FC<PropertyAnalysisProps> = ({
  step,
  setStep,
  property,
  setProperty,
}) => {
  return (
    <FormLayout>
      <FormControl>
        <FormLabel>Acres</FormLabel>
        <NumberInput
          precision={2}
          min={0}
          step={0.1}
          value={property.acres}
          onChange={(val) => setProperty({ ...property, acres: Number(val) })}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl marginTop="10px">
        <FormLabel>Gross Buildable Area (SQFT)</FormLabel>
        <NumberInput
          min={0}
          value={property.gross_buildable_area}
          onChange={(val) =>
            setProperty({ ...property, gross_buildable_area: Number(val) })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel marginTop="10px">Vacancy Rate</FormLabel>
        <InputGroup>
          <NumberInput
            min={0}
            max={100}
            step={0.1}
            precision={2}
            w="100%"
            value={property.vacancy_rate}
            onChange={(val) =>
              setProperty({ ...property, vacancy_rate: Number(val) })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <InputRightElement marginRight="20px" color="gray.500">
            <FiPercent />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Analysis Start Date</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            value={
              property.timing.analysis_start_date.toISOString().split("T")[0]
            }
            onChange={(e) =>
              setProperty({
                ...property,
                timing: {
                  ...property.timing,
                  analysis_start_date: new Date(e.target.value),
                },
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Analysis Length (Years)</FormLabel>
          <NumberInput
            min={0}
            value={property.timing.analysis_length_years}
            onChange={(val) =>
              setProperty({
                ...property,
                timing: {
                  ...property.timing,
                  analysis_length_years: Number(val),
                },
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <HStack marginTop="10px">
        <FormControl>
          <FormLabel>Analysis Growth Begin Month</FormLabel>
          <NumberInput
            min={0}
            value={property.timing.growth_begin_month}
            onChange={(val) =>
              setProperty({
                ...property,
                timing: {
                  ...property.timing,
                  growth_begin_month: Number(val),
                },
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Residual Analysis Months</FormLabel>
          <NumberInput
            min={0}
            value={property.timing.residual_months}
            onChange={(val) =>
              setProperty({
                ...property,
                timing: {
                  ...property.timing,
                  residual_months: Number(val),
                },
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
    </FormLayout>
  );
};
