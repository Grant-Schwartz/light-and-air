"use client";

import { ExpensesInfo } from "@/components/ExpensesInfo";
import Toolbar from "@/components/Toolbar";
import { PropertyData } from "@/utils/PropertyContext";
import { ApartmentExpense } from "@/utils/models";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ApartmentExpensePreset,
  SelfStorageExpensePreset,
  SeniorHousingExpensePreset,
} from "./presets";
import { ExpenseSheet } from "@/components/ExpensesInfo/sheet";

export default function Expenses() {
  const { property, setProperty } = useContext(PropertyData);
  const [sheetView, setSheetView] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  const sheet = () => {
    setSheetView(!sheetView);
  };
  const addPresetExpenses = () => {
    const prevProperty = { ...property };
    if (property.property_sub_type === "Apartment") {
      var presets = ApartmentExpensePreset;
    } else if (property.property_sub_type === "Self Storage") {
      var presets = SelfStorageExpensePreset;
    } else if (property.property_sub_type === "Student Housing") {
      var presets = ApartmentExpensePreset;
    } else {
      var presets = SeniorHousingExpensePreset;
    }
    prevProperty.expenses = presets;
    setProperty(prevProperty);
  };
  const addBlankExpense = () => {
    const prevProperty = { ...property };
    const blankExpense: ApartmentExpense = {
      name: "Expense Name",
      type: "OpEx",
      cagr: 3.0,
      percent_fixed: 0.0,
      base_amount: 0.0,
      uniqueId: uuidv4(),
      type_dropdown: false,
    };
    prevProperty.expenses.push(blankExpense);
    setProperty(prevProperty);
  };
  const copyExpense = () => {
    var copied = [];
    for (const [key, value] of Object.entries(selected)) {
      if (value === true) {
        var ten = property.expenses.filter(
          (expense) => expense.uniqueId === key
        )[0];
        var newExpense = { ...ten };
        newExpense.uniqueId = uuidv4();
        copied.push(newExpense);
      }
    }
    setProperty({
      ...property,
      expenses: property.expenses.concat(copied),
    });
    setSelected({});
  };

  const deleteExpense = () => {
    var newExpenses = property.expenses;
    var deletedIds = Object.keys(selected).filter(
      (id) => selected[id] === true
    );

    var arr = newExpenses.filter(
      (expense) => deletedIds.indexOf(expense.uniqueId) === -1
    );
    setProperty({
      ...property,
      expenses: arr,
    });
    setSelected({});
  };
  return (
    <>
      <Toolbar
        title="Expenses"
        sheet={sheet}
        add={() => addBlankExpense()}
        copy={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : copyExpense
        }
        del={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : deleteExpense
        }
      />
      {sheetView === true ? (
        <ExpenseSheet property={property} setProperty={setProperty} />
      ) : (
        <ExpensesInfo
          property={property}
          setProperty={setProperty}
          selected={selected}
          setSelected={setSelected}
          addPresetExpenses={addPresetExpenses}
          addBlankExpense={() => addBlankExpense()}
        />
      )}
    </>
  );
}
