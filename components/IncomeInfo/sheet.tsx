import { Property } from "@/utils/models";
import { Row, Column, ReactGrid, CellChange } from "@silevis/reactgrid";
import { Dispatch, SetStateAction, FC } from "react";

interface IncomeSheetProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Income Name" },
    { type: "header", text: "Base Amount" },
    { type: "header", text: "CAGR" },
    { type: "header", text: "Percent Fixed" },
  ],
};

const getColumns = (): Column[] => [
  { columnId: "name" },
  { columnId: "base_amount" },
  { columnId: "cagr" },
  { columnId: "percent_fixed" },
];

interface IncomeRowProps {
  property: Property;
  index: number;
}

const incomeRow = ({ property, index }: IncomeRowProps) => {
  const incomeExcelRow: Row = {
    rowId: index,
    cells: [
      {
        type: "text",
        text: property.incomes[index].name,
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
  for (var i = 0; i < property.incomes.length; i++) {
    all_rows.push(incomeRow({ property: property, index: i }));
  }
  return all_rows;
};

export const IncomeSheet: FC<IncomeSheetProps> = ({
  property,
  setProperty,
}) => {
  const applyIncomeChanges = (
    changes: CellChange[],
    prevProperty: Property
  ) => {
    changes.forEach((change: CellChange) => {
      var incomeIndex = Number(change.rowId);
      var field = change.columnId.toString();
      if (change.type === "text") {
        (prevProperty as any).incomes[incomeIndex][field] = change.newCell.text;
      }
    });
    return { ...prevProperty };
  };
  const handleChanges = (changes: CellChange[]) => {
    setProperty((prevProperty: Property) =>
      applyIncomeChanges(changes, prevProperty)
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
