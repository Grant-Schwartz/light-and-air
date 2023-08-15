import { Property } from "@/utils/models";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  FormHelperText,
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
  Select,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { FiPercent } from "react-icons/fi";

export interface PropertyInfoProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

const GeneralData: FC<PropertyInfoProps> = ({ property, setProperty }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            General Data
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
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
      </AccordionPanel>
    </AccordionItem>
  );
};

const AnalysisTiming: FC<PropertyInfoProps> = ({ property, setProperty }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Analysis Timing
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
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
      </AccordionPanel>
    </AccordionItem>
  );
};

export const PropertyInfo: FC<PropertyInfoProps> = ({
  property,
  setProperty,
}) => {
  return (
    <>
      <FormControl marginTop="10px">
        <FormLabel>Property Name</FormLabel>
        <Input
          type="text"
          value={property.name}
          onChange={(e) => setProperty({ ...property, name: e.target.value })}
        />
      </FormControl>
      <FormControl marginTop="20px">
        <FormLabel>Property Type</FormLabel>
        <Select
          value={property.property_sub_type}
          onChange={(e) =>
            setProperty({ ...property, property_sub_type: e.target.value })
          }
        >
          <option value="Apartment">Apartment</option>
          <option value="Self Storage">Self Storage</option>
          <option value="Student Housing">Student Housing</option>
          <option value="Senior Housing">Senior Housing</option>
        </Select>
      </FormControl>
      <FormControl marginTop="20px">
        <FormLabel>Location</FormLabel>
        <HStack>
          <Input
            type="text"
            placeholder="Address"
            value={property.location.address}
            onChange={(e) =>
              setProperty({
                ...property,
                location: {
                  ...property.location,
                  address: e.target.value,
                },
              })
            }
          />
          <Input
            type="text"
            placeholder="City"
            value={property.location.city}
            onChange={(e) =>
              setProperty({
                ...property,
                location: {
                  ...property.location,
                  city: e.target.value,
                },
              })
            }
          />
        </HStack>
        <HStack marginTop="10px">
          <Input
            type="text"
            placeholder="State"
            value={property.location.state}
            onChange={(e) =>
              setProperty({
                ...property,
                location: {
                  ...property.location,
                  state: e.target.value,
                },
              })
            }
          />
          <Input
            type="text"
            placeholder="Zipcode"
            value={property.location.zipcode}
            onChange={(e) =>
              setProperty({
                ...property,
                location: {
                  ...property.location,
                  zipcode: e.target.value,
                },
              })
            }
          />
        </HStack>
      </FormControl>
      <FormLabel marginTop="20px">Other Information</FormLabel>
      <Accordion allowMultiple>
        <GeneralData property={property} setProperty={setProperty} />
        <AnalysisTiming property={property} setProperty={setProperty} />
      </Accordion>
    </>
  );
};
