"use client";

import { PropertyInfo } from "@/components/PropertyInfo";
import { PropertyInfoSheet } from "@/components/PropertyInfo/sheet";
import Toolbar from "@/components/Toolbar";
import { PropertyData } from "@/utils/PropertyContext";
import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

export default function Property() {
  const { property, setProperty } = useContext(PropertyData);
  const [sheetView, setSheetView] = useState<boolean>(false);

  const sheet = () => {
    setSheetView(!sheetView);
  };

  useEffect(() => {
    console.log(property);
  }, [property]);

  return (
    <>
      <Toolbar title="Property Info" sheet={sheet} />

      <Box as="main" flex="1" py="2" px="4" overflowY="auto">
        {sheetView === true ? (
          <PropertyInfoSheet property={property} setProperty={setProperty} />
        ) : (
          <PropertyInfo property={property} setProperty={setProperty} />
        )}
      </Box>
    </>
  );
}
