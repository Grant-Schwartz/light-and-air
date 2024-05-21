import { ApartmentIncome, Property } from "@/utils/models";
import {
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from "@chakra-ui/react";
import { EmptyState } from "@saas-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { FiDollarSign } from "react-icons/fi";

interface IncomeProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  addPresetIncomes: () => void;
  addBlankIncome: () => void;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
}

interface IncomeRowProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  index: number;
}

const IncomeRow: FC<IncomeRowProps> = ({
  property,
  setProperty,
  selected,
  setSelected,
  index,
}) => {
  const resolveSelect = (checked: boolean, uniqueId: string) => {
    const prevCheckArr = { ...selected };
    prevCheckArr[uniqueId] = checked;
    setSelected(prevCheckArr);
  };
  const handleIncomeChange = (key: string, val: any, index: number) => {
    const prevProperty = { ...property };
    (prevProperty as any).incomes[index][key] = val;
    setProperty(prevProperty);
  };
  const dollarFormat = (val: string) => "$" + val;
  const dollarParse = (val: string) => Number(val.replace(/^\$/, ""));
  return (
    <Tr>
      <Td>
        <Checkbox
          onChange={(e) =>
            resolveSelect(e.target.checked, property.incomes[index].uniqueId)
          }
          isChecked={selected[property.incomes[index].uniqueId] ? true : false}
        />
      </Td>
      <Td>
        <Editable
          value={property.incomes[index].name}
          minW="100px"
          maxW="200px"
          onChange={(val) => handleIncomeChange("name", val, index)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <Editable
          maxW="200px"
          value={dollarFormat(property.incomes[index].base_amount.toString())}
          onChange={(val) =>
            handleIncomeChange("base_amount", dollarParse(val), index)
          }
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <HStack>
          <Editable
            value={property.incomes[index].cagr.toString()}
            onChange={(val) => handleIncomeChange("cagr", val, index)}
            w="auto"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Text marginLeft="-5px">%</Text>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Editable
            value={property.incomes[index].percent_fixed.toString()}
            onChange={(val) => handleIncomeChange("percent_fixed", val, index)}
            w="auto"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Text marginLeft="-5px">%</Text>
        </HStack>
      </Td>
    </Tr>
  );
};

export const IncomeInfo: FC<IncomeProps> = ({
  property,
  setProperty,
  addPresetIncomes,
  addBlankIncome,
  selected,
  setSelected,
}) => {
  if (property.incomes.length === 0) {
    return (
      <center style={{ marginTop: "40px" }}>
        <EmptyState
          colorScheme="primary"
          icon={FiDollarSign}
          title="No incomes yet"
          description="You haven't added any incomes yet."
          actions={
            <VStack>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("in");
                  addPresetIncomes();
                }}
              >
                Add incomes from {property.property_sub_type.toLowerCase()}{" "}
                template
              </Button>
              <Button onClick={() => addBlankIncome()}>Add income</Button>
            </VStack>
          }
        />
      </center>
    );
  }
  return (
    <>
      <TableContainer h="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th />
              <Th>Name</Th>
              <Th>Base Amount</Th>
              <Th>CAGR (%)</Th>
              <Th>Percent Fixed (%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {property.incomes.map((income: ApartmentIncome, index: number) => (
              <IncomeRow
                property={property}
                setProperty={setProperty}
                selected={selected}
                setSelected={setSelected}
                index={index}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
