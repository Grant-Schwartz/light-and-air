import { ApartmentIncome } from "@/utils/models";
import { v4 as uuidv4 } from "uuid";

export const ApartmentIncomePreset: ApartmentIncome[] = [
  {
    name: "Parking Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "Storage Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "Other Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
];

export const SelfStorageIncomePreset: ApartmentIncome[] = [
  {
    name: "RV / Boat Parking Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "Vending Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "Other Income",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
];

export const SeniorHousingIncomePreset: ApartmentIncome[] = [
  {
    name: "Community Fees",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "Extended Services + Other",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
  {
    name: "2nd Resident",
    cagr: 2.0,
    percent_fixed: 0.0,
    base_amount: 0,
    uniqueId: uuidv4(),
  },
];
