import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { Property } from "./models";

const baseProperty: Property = {
  name: "",
  property_type: "Apartment",
  property_sub_type: "Apartment",
  location: {
    address: "",
    city: "",
    state: "",
    zipcode: "",
  },
  acres: 0,
  gross_buildable_area: 0,
  vacancy_rate: 0.0,
  timing: {
    analysis_length_years: 10,
    analysis_start_date: new Date(),
    growth_begin_month: 13,
    residual_months: 0,
  },
  year_built: "N/A",
  tenants: [],
  incomes: [],
  expenses: [],
};

interface PropertyDataContext {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
}

export const PropertyData = createContext<PropertyDataContext>({
  property: baseProperty,
  setProperty: () => undefined,
});

export default function PropertyContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [property, setProperty] = useState<Property>(baseProperty);

  return (
    <PropertyData.Provider value={{ property, setProperty }}>
      {children}
    </PropertyData.Provider>
  );
}
