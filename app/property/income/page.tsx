"use client";

import { IncomeInfo } from "@/components/IncomeInfo";
import Toolbar from "@/components/Toolbar";
import { PropertyData } from "@/utils/PropertyContext";
import { ApartmentIncome, Property } from "@/utils/models";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ApartmentIncomePreset,
  SelfStorageIncomePreset,
  SeniorHousingIncomePreset,
} from "./presets";
import { IncomeSheet } from "@/components/IncomeInfo/sheet";

export default function Income() {
  const { property, setProperty } = useContext(PropertyData);
  const [sheetView, setSheetView] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});

  const sheet = () => {
    setSheetView(!sheetView);
  };

  const addPresetIncomes = () => {
    const prevProperty = { ...property };
    if (property.property_sub_type === "Apartment") {
      var presets = ApartmentIncomePreset;
    } else if (property.property_sub_type === "Self Storage") {
      var presets = SelfStorageIncomePreset;
    } else if (property.property_sub_type === "Student Housing") {
      var presets = ApartmentIncomePreset;
    } else {
      var presets = SeniorHousingIncomePreset;
    }
    prevProperty.incomes = presets;
    setProperty(prevProperty);
  };

  const addBlankIncome = () => {
    const prevProperty = { ...property };
    const blankIncome: ApartmentIncome = {
      name: "Income Name",
      cagr: 3.0,
      percent_fixed: 0.0,
      base_amount: 0.0,
      uniqueId: uuidv4(),
    };
    prevProperty.incomes.push(blankIncome);
    setProperty(prevProperty);
  };
  const copyIncome = () => {
    var copied = [];
    for (const [key, value] of Object.entries(selected)) {
      if (value === true) {
        var ten = property.incomes.filter(
          (income) => income.uniqueId === key
        )[0];
        var newIncome = { ...ten };
        newIncome.uniqueId = uuidv4();
        copied.push(newIncome);
      }
    }
    setProperty({
      ...property,
      incomes: property.incomes.concat(copied),
    });
    setSelected({});
  };

  const deleteIncome = () => {
    var newIncomes = property.incomes;
    var deletedIds = Object.keys(selected).filter(
      (id) => selected[id] === true
    );

    var arr = newIncomes.filter(
      (income) => deletedIds.indexOf(income.uniqueId) === -1
    );
    setProperty({
      ...property,
      incomes: arr,
    });
    setSelected({});
  };
  return (
    <>
      <Toolbar
        title="Income"
        sheet={sheet}
        add={() => addBlankIncome()}
        copy={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : copyIncome
        }
        del={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : deleteIncome
        }
      />
      {sheetView === true ? (
        <IncomeSheet property={property} setProperty={setProperty} />
      ) : (
        <IncomeInfo
          property={property}
          setProperty={setProperty}
          selected={selected}
          setSelected={setSelected}
          addPresetIncomes={addPresetIncomes}
          addBlankIncome={() => addBlankIncome()}
        />
      )}
    </>
  );
}
