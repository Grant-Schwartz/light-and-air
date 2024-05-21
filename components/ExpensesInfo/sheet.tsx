import { Property } from "@/utils/models";
import { Row, Column, ReactGrid, CellChange } from "@silevis/reactgrid";
import { Dispatch, SetStateAction, FC } from "react";

interface ExpenseSheetProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Expense Name" },
    { type: "header", text: "Expense Type" },
    { type: "header", text: "Base Amount" },
    { type: "header", text: "CAGR" },
    { type: "header", text: "Percent Fixed" },
  ],
};

const getColumns = (): Column[] => [
  { columnId: "name" },
  { columnId: "type" },
  { columnId: "base_amount" },
  { columnId: "cagr" },
  { columnId: "percent_fixed" },
];

interface ExpenseRowProps {
  property: Property;
  index: number;
}

const expenseRow = ({ property, index }: ExpenseRowProps) => {
  const incomeExcelRow: Row = {
    rowId: index,
    cells: [
      {
        type: "text",
        text: property.expenses[index].name,
      },
      {
        type: "dropdown",
        selectedValue: property.expenses[index].type,
        values: [
          { label: "OpEx", value: "OpEx" },
          { label: "CapEx", value: "CapEx" },
        ],
        isOpen: property.expenses[index].type_dropdown,
      },
      {
        type: "text",
        text: property.incomes[index].base_amount.toString(),
      },
      {
        type: "text",
        text: property.incomes[index].cagr.toString(),
      },
      {
        type: "text",
        text: property.incomes[index].percent_fixed.toString(),
      },
    ],
  };
  return incomeExcelRow;
};

const getRows = (property: Property) => {
  var all_rows: Row[] = [headerRow];
  for (var i = 0; i < property.expenses.length; i++) {
    all_rows.push(expenseRow({ property: property, index: i }));
  }
  return all_rows;
};

export const ExpenseSheet: FC<ExpenseSheetProps> = ({
  property,
  setProperty,
}) => {
  const applyExpenseChanges = (
    changes: CellChange[],
    prevProperty: Property
  ) => {
    changes.forEach((change: CellChange) => {
      var expenseIndex = Number(change.rowId);
      var field = change.columnId.toString();
      if (change.type === "text") {
        (prevProperty as any).expenses[expenseIndex][field] =
          change.newCell.text;
      } else if (change.type === "dropdown") {
        if (change.previousCell.isOpen !== change.newCell.isOpen) {
          if (field === "roll_to_market.strategy") {
            prevProperty.expenses[expenseIndex].type_dropdown = change.newCell
              .isOpen as boolean;
          }
        }
      }
    });
    return { ...prevProperty };
  };

  const handleChanges = (changes: CellChange[]) => {
    setProperty((prevProperty: Property) =>
      applyExpenseChanges(changes, prevProperty)
    );
  };

  return (
    <ReactGrid
      rows={getRows(property)}
      columns={getColumns()}
      onCellsChanged={handleChanges}
      enableRangeSelection
      enableFullWidthHeader
    />
  );
};
