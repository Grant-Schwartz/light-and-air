import { Property } from "@/utils/models";
import { Box } from "@chakra-ui/react";
import { CellChange, Column, ReactGrid, Row } from "@silevis/reactgrid";
import { Dispatch, FC, SetStateAction } from "react";

interface TenantSheetProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Unit Name" },
    { type: "header", text: "Beds" },
    { type: "header", text: "Baths" },
    { type: "header", text: "Unit Size (SQFT)" },
    { type: "header", text: "Total Units" },
    { type: "header", text: "Units Initially Leased" },
    { type: "header", text: "Lease Up Pace (Units/Mo)" },
    { type: "header", text: "In Place Rent ($)" },
    { type: "header", text: "Roll To Market" },
    { type: "header", text: "Roll To Market Month" },
    { type: "header", text: "Rent Growth" },
    { type: "header", text: "Utility Reimbursement (Tenant/Mo)" },
    { type: "header", text: "Make Ready New Lease Cost" },
    { type: "header", text: "Make Ready Renew Lease Cost" },
    { type: "header", text: "Free Rent New Lease" },
    { type: "header", text: "Free Rent Renew Lease" },
    { type: "header", text: "Free Rent Second Gen Lease" },
    { type: "header", text: "Renewal Probability" },
    { type: "header", text: "Downtime (Days)" },
  ],
};

const getColumns = (): Column[] => [
  { columnId: "unit_name" },
  { columnId: "beds" },
  { columnId: "bath" },
  { columnId: "unit_size" },
  { columnId: "total_units" },
  { columnId: "units_lease_initial", width: 200 },
  { columnId: "lease_up_pace", width: 220 },
  { columnId: "in_place_rent" },
  { columnId: "roll_to_market.strategy" },
  { columnId: "roll_to_market_month", width: 200 },
  { columnId: "rent_growth" },
  { columnId: "utility_reimbursement", width: 300 },
  { columnId: "make_ready_new_cost", width: 280 },
  { columnId: "make_ready_renew_cost", width: 280 },
  { columnId: "free_rent_new", width: 200 },
  { columnId: "free_rent_renew", width: 200 },
  { columnId: "free_rent_second_generation", width: 280 },
  { columnId: "renewal_probability", width: 200 },
  { columnId: "downtime" },
];

interface TenantRowProps {
  property: Property;
  index: number;
}

const tenantRow = ({ property, index }: TenantRowProps) => {
  const tenantExcelRow: Row = {
    rowId: index,
    cells: [
      { type: "text", text: property.tenants[index].unit_name },
      { type: "text", text: property.tenants[index].beds.toString() },
      { type: "text", text: property.tenants[index].bath.toString() },
      { type: "text", text: property.tenants[index].unit_size.toString() },
      { type: "text", text: property.tenants[index].total_units.toString() },
      {
        type: "text",
        text: property.tenants[index].units_lease_initial.toString(),
      },
      { type: "text", text: property.tenants[index].lease_up_pace.toString() },
      { type: "text", text: property.tenants[index].in_place_rent.toString() },
      {
        type: "dropdown",
        selectedValue: property.tenants[index].roll_to_market.strategy,
        values: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
          { label: "In Month", value: "In Month" },
        ],
        isOpen: property.tenants[index].roll_to_market_dropdown,
      },
      {
        type: "text",
        text: property.tenants[index].roll_to_market.start_month.toString(),
        style: { background: "#e7e7e8", color: "#e7e7e8" },
      },
      { type: "text", text: "" },
      {
        type: "text",
        text: property.tenants[index].utility_reimbursement.toString(),
      },
      {
        type: "text",
        text: property.tenants[index].make_ready_new_cost.toString(),
      },
      {
        type: "text",
        text: property.tenants[index].make_ready_renew_cost.toString(),
      },
      { type: "text", text: property.tenants[index].free_rent_new.toString() },
      {
        type: "text",
        text: property.tenants[index].free_rent_renew.toString(),
      },
      {
        type: "dropdown",
        selectedValue: property.tenants[index].free_rent_second_generation
          ? "Yes"
          : "No",
        values: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
        isOpen: property.tenants[index].free_rent_second_generation_dropdown,
      },
      {
        type: "text",
        text: property.tenants[index].renewal_probability.toString(),
      },
      { type: "text", text: property.tenants[index].downtime.toString() },
    ],
  };
  if (property.tenants[index].roll_to_market.strategy === "In Month") {
    tenantExcelRow.cells[9] = {
      type: "text",
      text: property.tenants[index].roll_to_market.start_month.toString(),
    };
  }
  return tenantExcelRow;
};

const getRows = (property: Property) => {
  var all_rows: Row[] = [headerRow];
  for (var i = 0; i < property.tenants.length; i++) {
    all_rows.push(tenantRow({ property: property, index: i }));
  }
  return all_rows;
};

export const TenantSheet: FC<TenantSheetProps> = ({
  property,
  setProperty,
}) => {
  const applyTenantChanges = (
    changes: CellChange[],
    prevProperty: Property
  ) => {
    changes.forEach((change: CellChange) => {
      var tenantIndex = Number(change.rowId);
      var field = change.columnId.toString();
      if (change.type === "text") {
        (prevProperty as any).tenants[tenantIndex][field] = change.newCell.text;
      } else if (change.type === "number") {
        (prevProperty as any).tenants[field] = change.newCell.value;
      } else if (change.type === "dropdown") {
        if (change.previousCell.isOpen !== change.newCell.isOpen) {
          if (field === "roll_to_market.strategy") {
            prevProperty.tenants[tenantIndex].roll_to_market_dropdown = change
              .newCell.isOpen as boolean;
          } else if (field === "free_rent_second_generation") {
            prevProperty.tenants[
              tenantIndex
            ].free_rent_second_generation_dropdown = change.newCell
              .isOpen as boolean;
          }
          if (
            change.previousCell.selectedValue !== change.newCell.selectedValue
          ) {
            if (field.includes(".")) {
              const split: string[] = field.split(".");
              (prevProperty as any).tenants[tenantIndex][split[0]][split[1]] =
                change.newCell.selectedValue;
            } else {
              (prevProperty as any).tenants[tenantIndex][field] =
                change.newCell.selectedValue;
            }
          }
        }
      }
    });
    return { ...prevProperty };
  };
  const handleChanges = (changes: CellChange[]) => {
    setProperty((prevProperty: Property) =>
      applyTenantChanges(changes, prevProperty)
    );
  };
  return (
    <Box style={{ width: "100%", height: "100%" }} overflowX="scroll">
      <ReactGrid
        rows={getRows(property)}
        columns={getColumns()}
        onCellsChanged={handleChanges}
        enableRangeSelection
        enableFullWidthHeader
      />
    </Box>
  );
};
