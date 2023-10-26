import { Property } from "@/utils/models";
import { VStack, Button } from "@chakra-ui/react";
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
              <Button
                colorScheme="primary"
                onClick={() => {
                  addPresetExpenses();
                }}
              >
                Add expenses from {property.property_sub_type.toLowerCase()}{" "}
                template
              </Button>
              <Button onClick={() => addBlankExpense()}>Add income</Button>
            </VStack>
          }
        />
      </center>
    );
  }
  return (
    <div>
      <div>Rows</div>
    </div>
  );
};
