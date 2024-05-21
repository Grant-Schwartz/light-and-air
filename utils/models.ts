export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface AnalysisTiming {
  analysis_length_years: number;
  analysis_start_date: Date;
  growth_begin_month: number;
  residual_months: number;
}

export interface ApartmentRollToMarket {
  strategy: "Yes" | "No" | "In Month";
  start_month: number | string;
}

export interface ApartmentTenant {
  unit_name: string;
  beds: number;
  bath: number;
  unit_size: number;
  total_units: number;
  units_lease_initial: number;
  lease_up_pace: number;
  in_place_rent: number;
  roll_to_market: ApartmentRollToMarket;
  market_rent: number;
  rent_growth_matrix: any;
  utility_reimbursement: number;
  make_ready_new_cost: number;
  make_ready_renew_cost: number;
  free_rent_new: number;
  free_rent_renew: number;
  free_rent_second_generation: boolean;
  renewal_probability: number;
  downtime: number;
  uniqueId: string;
  roll_to_market_dropdown: boolean;
  free_rent_second_generation_dropdown: boolean;
}

export interface ApartmentIncome {
  name: string;
  cagr: number;
  percent_fixed: number;
  base_amount: number;
  uniqueId: string;
}

export interface ApartmentExpense {
  name: string;
  type: "OpEx" | "CapEx";
  cagr: number;
  percent_fixed: number;
  base_amount: number;
  uniqueId: string;
  type_dropdown: boolean;
}

export interface Property {
  name: string;
  property_type: "Multifamily";
  property_sub_type: string;
  location: PropertyLocation;
  acres: number;
  gross_buildable_area: number;
  vacancy_rate: number;
  timing: AnalysisTiming;
  year_built: string;
  tenants: ApartmentTenant[];
  incomes: ApartmentIncome[];
  expenses: ApartmentExpense[];
}
