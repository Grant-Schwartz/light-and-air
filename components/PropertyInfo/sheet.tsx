"use client";

import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  DropdownCell,
  TextCell,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { PropertyInfoProps } from ".";
import { FC, useState } from "react";
import { Property } from "@/utils/models";

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Field" },
    { type: "header", text: "Value" },
  ],
};

const getColumns = (): Column[] => [
  { columnId: "field", width: 250 },
  { columnId: "value", width: 200 },
];

export const PropertyInfoSheet: FC<PropertyInfoProps> = ({
  property,
  setProperty,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);

  const getFields = (property: Property): Row[] => [
    headerRow,
    {
      rowId: "name",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Property Name",
        },
        {
          type: "text",
          style: { color: "blue" },
          text: property.name,
        },
      ],
    },
    {
      rowId: "property_sub_type",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Property Type",
        },
        {
          type: "dropdown",
          style: { color: "blue" },
          selectedValue: property.property_sub_type,
          values: [
            { label: "Apartment", value: "Apartment" },
            { label: "Self Storage", value: "Self Storage" },
            { label: "Student Storage", value: "Student Housing" },
            { label: "Senior Housing", value: "Senior Housing" },
          ],
          isOpen: isDropdownOpened,
        },
      ],
    },
    {
      rowId: "location.address",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Address",
        },
        {
          type: "text",
          style: { color: "blue" },
          text: property.location.address,
        },
      ],
    },
    {
      rowId: "location.city",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "City",
        },
        {
          type: "text",
          style: { color: "blue" },
          text: property.location.city,
        },
      ],
    },
    {
      rowId: "location.state",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "State",
        },
        {
          type: "text",
          style: { color: "blue" },
          text: property.location.state,
        },
      ],
    },
    {
      rowId: "location.zipcode",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Zipcode",
        },
        {
          type: "text",
          style: { color: "blue" },
          text: property.location.zipcode,
        },
      ],
    },
    {
      rowId: "acres",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Acres",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.acres,
        },
      ],
    },
    {
      rowId: "gross_buildable_area",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Gross Buildable Area",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.gross_buildable_area,
        },
      ],
    },
    {
      rowId: "vacancy_rate",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Vacancy Rate",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.vacancy_rate,
        },
      ],
    },
    {
      rowId: "timing.analysis_start_date",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Analysis Start Date",
        },
        {
          type: "date",
          style: { color: "blue" },
          date: property.timing.analysis_start_date,
        },
      ],
    },
    {
      rowId: "timing.analysis_length_years",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Analysis Length (Years)",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.timing.analysis_length_years,
        },
      ],
    },
    {
      rowId: "timing.growth_begin_month",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Analysis Growth Begin Month",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.timing.growth_begin_month,
        },
      ],
    },
    {
      rowId: "timing.residual_months",
      cells: [
        {
          type: "text",
          nonEditable: true,
          text: "Residual Analysis Months",
        },
        {
          type: "number",
          style: { color: "blue" },
          value: property.timing.residual_months,
        },
      ],
    },
  ];

  const applyChanges = (
    changes: CellChange[],
    prevProperty: Property
  ): Property => {
    changes.forEach((change) => {
      const field = change.rowId.toString();
      if (change.type === "text") {
        if (field.includes(".")) {
          const split: string[] = field.split(".");
          (prevProperty as any)[split[0]][split[1]] = change.newCell.text;
        } else {
          (prevProperty as any)[field] = change.newCell.text;
        }
      } else if (change.type === "number") {
        if (field.includes(".")) {
          const split: string[] = field.split(".");
          (prevProperty as any)[split[0]][split[1]] = change.newCell.value;
        } else {
          (prevProperty as any)[field] = change.newCell.value;
        }
      } else if (change.type === "dropdown") {
        if (change.previousCell.isOpen !== change.newCell.isOpen) {
          setIsDropdownOpened(change.newCell.isOpen as boolean);

          if (
            change.previousCell.selectedValue !== change.newCell.selectedValue
          ) {
            (prevProperty as any)[field] = change.newCell.selectedValue;
          }
        }
      }
    });

    return { ...prevProperty };
  };

  const handleChanges = (changes: CellChange[]) => {
    setProperty((prevProperty: Property) =>
      applyChanges(changes, prevProperty)
    );
  };

  return (
    <div>
      <ReactGrid
        rows={getFields(property)}
        columns={getColumns()}
        onCellsChanged={handleChanges}
        enableRangeSelection
      />
    </div>
  );
};
