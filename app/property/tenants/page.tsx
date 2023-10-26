"use client";

import { TenantsInfo } from "@/components/TenantsInfo";
import { TenantSheet } from "@/components/TenantsInfo/sheet";
import Toolbar from "@/components/Toolbar";
import { PropertyData } from "@/utils/PropertyContext";
import { ApartmentTenant, Property } from "@/utils/models";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Tenants() {
  const { property, setProperty } = useContext(PropertyData);
  const [sheetView, setSheetView] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});

  const sheet = () => {
    setSheetView(!sheetView);
  };

  const addBlankTenantRow = (property: Property) => {
    let default_matrix: any = {};
    for (let i = 0; i < 5; i++) {
      var key = property.timing.growth_begin_month + i * 12;
      default_matrix[key] = "3.0";
    }
    const blank: ApartmentTenant = {
      unit_name: "Unit Name",
      beds: 0,
      bath: 0,
      unit_size: 0,
      total_units: 0,
      units_lease_initial: 0,
      lease_up_pace: 0,
      in_place_rent: 0,
      roll_to_market: {
        strategy: "Yes",
        start_month: "",
      },
      market_rent: 0,
      rent_growth_matrix: default_matrix,
      utility_reimbursement: 0,
      make_ready_renew_cost: 0,
      make_ready_new_cost: 0,
      free_rent_new: 0,
      free_rent_renew: 0,
      free_rent_second_generation: false,
      renewal_probability: 0.0,
      downtime: 0,
      uniqueId: uuidv4(),
      roll_to_market_dropdown: false,
      free_rent_second_generation_dropdown: false,
    };
    setProperty({ ...property, tenants: property.tenants.concat(blank) });
  };

  const copyTenant = () => {
    var copied = [];
    for (const [key, value] of Object.entries(selected)) {
      if (value === true) {
        console.log(key);
        var ten = property.tenants.filter(
          (tenant) => tenant.uniqueId === key
        )[0];
        var newTenant = { ...ten };
        newTenant.uniqueId = uuidv4();
        copied.push(newTenant);
        console.log(copied);
      }
    }
    setProperty({
      ...property,
      tenants: property.tenants.concat(copied),
    });
    setSelected({});
  };

  const deleteTenant = () => {
    var newTens = property.tenants;
    var deletedIds = Object.keys(selected).filter(
      (id) => selected[id] === true
    );

    var arr = newTens.filter(
      (tenant) => deletedIds.indexOf(tenant.uniqueId) === -1
    );
    setProperty({
      ...property,
      tenants: arr,
    });
    setSelected({});
  };

  return (
    <>
      <Toolbar
        title="Tenants"
        sheet={sheet}
        add={() => addBlankTenantRow(property)}
        copy={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : copyTenant
        }
        del={
          Object.values(selected).every((item) => item === false)
            ? undefined
            : deleteTenant
        }
      />

      {sheetView === true ? (
        <TenantSheet property={property} setProperty={setProperty} />
      ) : (
        <TenantsInfo
          property={property}
          setProperty={setProperty}
          addBlankTenantRow={() => addBlankTenantRow(property)}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </>
  );
}
