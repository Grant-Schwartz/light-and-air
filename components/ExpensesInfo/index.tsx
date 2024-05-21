import { ApartmentIncome, Property } from "@/utils/models";
import {
  VStack,
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Td,
  Text,
  Select,
  Center,
} from "@chakra-ui/react";
import { EmptyState } from "@saas-ui/react";
import { Dispatch, SetStateAction, FC } from "react";
import { FiPieChart } from "react-icons/fi";

interface ExpensesInfoProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  addPresetExpenses: () => void;
  addBlankExpense: () => void;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
}

interface ExpenseRowProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  index: number;
}

const ExpenseRow: FC<ExpenseRowProps> = ({
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
  const handleExpenseChange = (key: string, val: any, index: number) => {
    const prevProperty = { ...property };
    (prevProperty as any).expenses[index][key] = val;
    setProperty(prevProperty);
  };
  const dollarFormat = (val: string) => "$" + val;
  const dollarParse = (val: string) => Number(val.replace(/^\$/, ""));
  return (
    <Tr>
      <Td>
        <Checkbox
          onChange={(e) =>
            resolveSelect(e.target.checked, property.expenses[index].uniqueId)
          }
          isChecked={selected[property.expenses[index].uniqueId] ? true : false}
        />
      </Td>
      <Td>
        <Editable
          value={property.expenses[index].name}
          minW="100px"
          maxW="200px"
          onChange={(val) => handleExpenseChange("name", val, index)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <Select
          onChange={(e: any) =>
            handleExpenseChange("type", e.target.value, index)
          }
          value={property.expenses[index].type}
          maxW={150}
        >
          <option value="OpEx">OpEx</option>
          <option value="CapEx">CapEx</option>
        </Select>
      </Td>
      <Td>
        <Editable
          maxW="200px"
          value={dollarFormat(property.expenses[index].base_amount.toString())}
          onChange={(val) =>
            handleExpenseChange("base_amount", dollarParse(val), index)
          }
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <HStack>
          <Editable
            value={property.expenses[index].cagr.toString()}
            onChange={(val) => handleExpenseChange("cagr", val, index)}
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
            value={property.expenses[index].percent_fixed.toString()}
            onChange={(val) => handleExpenseChange("percent_fixed", val, index)}
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

export const ExpensesInfo: FC<ExpensesInfoProps> = ({
  property,
  setProperty,
  addPresetExpenses,
  addBlankExpense,
  selected,
  setSelected,
}) => {
  if (property.expenses.length === 0) {
    return (
      <center style={{ marginTop: "40px" }}>
        <EmptyState
          colorScheme="primary"
          icon={FiPieChart}
          title="No expenses yet"
          description="You haven't added any expenses yet."
          actions={
            <VStack>
              <Button variant="primary" onClick={() => addPresetExpenses()}>
                Add expenses from {property.property_sub_type.toLowerCase()}{" "}
                template
              </Button>
              <Button onClick={() => addBlankExpense()}>Add expense</Button>
            </VStack>
          }
        />
      </center>
    );
  }
  return (
    <>
      <TableContainer h="100%" overflow="auto">
        <Table variant="simple" overflowY="scroll">
          <Thead>
            <Tr>
              <Th />
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Base Amount</Th>
              <Th>CAGR (%)</Th>
              <Th>Percent Fixed (%)</Th>
            </Tr>
          </Thead>
          <Tbody overflow="auto">
            {property.expenses.map((income: ApartmentIncome, index: number) => (
              <ExpenseRow
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
