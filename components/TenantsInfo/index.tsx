"use client";

import { ApartmentTenant, Property } from "@/utils/models";
import {
  Button,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Text,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EmptyState } from "@saas-ui/react";
import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";

interface TenantsProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  addBlankTenantRow: () => void;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
}

interface TenantRowProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  index: number;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
}

interface RentGrowthMatrixProps {
  property: Property;
  setProperty: Dispatch<SetStateAction<Property>>;
  index: number;
}

const RentGrowthMatrix: FC<RentGrowthMatrixProps> = ({
  property,
  setProperty,
  index,
}) => {
  const [rentGrowthStrategy, setRentGrowthStrategy] = useState<string>("inc");
  const setDefaultForStrategy = (strategy: string) => {
    let default_matrix: any = {};
    if (strategy === "inc") {
      for (let i = 0; i < 5; i++) {
        var key = property.timing.growth_begin_month + i * 12;
        default_matrix[key] = "3.0";
      }
    } else {
      for (
        let i = 0;
        i <
        property.timing.analysis_length_years +
          property.timing.residual_months / 12;
        i++
      ) {
        var key = property.timing.growth_begin_month + i * 12;
        default_matrix[key] = "3.0";
      }
    }
    var prevProperty = { ...property };
    (prevProperty as any)["tenants"][index]["rent_growth_matrix"] =
      default_matrix;
    setProperty(prevProperty);
  };
  const format = (val: string) => val + "%";
  const parse = (val: string) => val.replace(/^\%/, "");

  const resolveMatrixChange = (key: number, change: string) => {
    var prev = { ...property };
    prev.tenants[index].rent_growth_matrix[key] = change;
    setProperty(prev);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Edit</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Rent Growth</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Select
              onChange={(e) => {
                setRentGrowthStrategy(e.target.value),
                  setDefaultForStrategy(e.target.value);
              }}
            >
              <option value="inc">Inc. %/Yr.</option>
              <option value="detailed">Detailed</option>
            </Select>
            <Table>
              <Thead>
                <Tr>
                  <Th>Month</Th>
                  <Th>Growth Rate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(property.tenants[index].rent_growth_matrix).map(
                  ([key, value], matrix_index) => (
                    <Tr>
                      <Td isNumeric>
                        <center>
                          {key}
                          {""}
                          {rentGrowthStrategy === "inc" && index === 4
                            ? "+"
                            : ""}
                        </center>
                      </Td>
                      <Td isNumeric>
                        <NumberInput
                          w="75px"
                          min={0}
                          max={100}
                          value={format(
                            property.tenants[index].rent_growth_matrix[key]
                          )}
                          onChange={(change) =>
                            resolveMatrixChange(
                              Number(key),
                              parse(change.toString())
                            )
                          }
                        >
                          <center>
                            <NumberInputField paddingRight="0px" />
                          </center>
                        </NumberInput>
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

const TenantRow: FC<TenantRowProps> = ({
  property,
  setProperty,
  index,
  selected,
  setSelected,
}) => {
  const handleTenantChange = (
    key: string,
    value: string | number,
    index: number
  ) => {
    const prevProperty = { ...property };

    (prevProperty as any)["tenants"][index][key] = value;
    setProperty(prevProperty);
  };

  const handleRollToMarket = (value: string, index: number) => {
    const prevProperty = { ...property };
    (prevProperty as any)["tenants"][index]["roll_to_market"]["strategy"] =
      value;
    if (value === "In Month") {
      (prevProperty as any)["tenants"][index]["roll_to_market"]["start_month"] =
        "13";
    } else {
      (prevProperty as any)["tenants"][index]["roll_to_market"]["start_month"] =
        "";
    }
    setProperty(prevProperty);
  };
  const resolveSelect = (checked: boolean, uniqueId: string) => {
    const prevCheckArr = { ...selected };
    prevCheckArr[uniqueId] = checked;
    setSelected(prevCheckArr);
  };
  const resolveSecondGen = (val: string) => {
    if (val === "Yes") {
      var res = true;
    } else {
      var res = false;
    }
    const prevProperty = { ...property };
    (prevProperty as any)["tenants"][index].free_rent_second_generation = res;
    setProperty(property);
  };
  const dollarFormat = (val: string) => "$" + val;
  const dollarParse = (val: string) => Number(val.replace(/^\$/, ""));
  return (
    <Tr>
      <Td>
        <Checkbox
          onChange={(e) =>
            resolveSelect(e.target.checked, property.tenants[index].uniqueId)
          }
          isChecked={selected[property.tenants[index].uniqueId] ? true : false}
        />
      </Td>
      <Td>
        <Editable
          value={property.tenants[index].unit_name}
          minW="100px"
          onChange={(val) => handleTenantChange("unit_name", val, index)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Td>
      <Td>
        <center>
          <Editable
            as={NumberInput}
            precision={0.1}
            value={property.tenants[index].beds.toString()}
            onChange={(val) => handleTenantChange("beds", val, index)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[index].bath.toString()}
            onChange={(val) => handleTenantChange("bath", val, index)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[index].unit_size.toString()}
            onChange={(val) => handleTenantChange("unit_size", val, index)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[index].total_units.toString()}
            onChange={(val) => handleTenantChange("total_units", val, index)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[index].units_lease_initial.toString()}
            onChange={(val) =>
              handleTenantChange("units_lease_initial", val, index)
            }
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[index].lease_up_pace.toString()}
            onChange={(val) => handleTenantChange("lease_up_pace", val, index)}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={dollarFormat(
              property.tenants[index].in_place_rent.toString()
            )}
            onChange={(val) =>
              handleTenantChange("in_place_rent", dollarParse(val), index)
            }
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Select onChange={(e) => handleRollToMarket(e.target.value, index)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="In Month">In Month</option>
          </Select>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={property.tenants[
              index
            ].roll_to_market.start_month?.toString()}
            isDisabled={
              property.tenants[index].roll_to_market.strategy === "In Month"
                ? false
                : true
            }
            bgColor={
              property.tenants[index].roll_to_market.strategy === "In Month"
                ? "white"
                : "gray.200"
            }
            borderRadius="md"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <RentGrowthMatrix
            property={property}
            setProperty={setProperty}
            index={index}
          />
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={dollarFormat(
              property.tenants[index].utility_reimbursement.toString()
            )}
            onChange={(val) =>
              handleTenantChange(
                "utility_reimbursement",
                dollarParse(val),
                index
              )
            }
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={dollarFormat(
              property.tenants[index].make_ready_new_cost.toString()
            )}
            onChange={(val) =>
              handleTenantChange("make_ready_new_cost", dollarParse(val), index)
            }
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <center>
          <Editable
            value={dollarFormat(
              property.tenants[index].make_ready_renew_cost.toString()
            )}
            onChange={(val) =>
              handleTenantChange(
                "make_ready_renew_cost",
                dollarParse(val),
                index
              )
            }
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </center>
      </Td>
      <Td>
        <HStack justifyContent="center">
          <Editable
            value={property.tenants[index].free_rent_new.toString()}
            onChange={(val) => handleTenantChange("free_rent_new", val, index)}
            w="auto"
          >
            <center>
              <EditablePreview />
              <EditableInput />
            </center>
          </Editable>
          <Text>Months</Text>
        </HStack>
      </Td>
      <Td>
        <HStack justifyContent="center">
          <Editable
            value={property.tenants[index].free_rent_renew.toString()}
            onChange={(val) =>
              handleTenantChange("free_rent_renew", val, index)
            }
            w="auto"
          >
            <center>
              <EditablePreview />
              <EditableInput />
            </center>
          </Editable>
          <Text>Months</Text>
        </HStack>
      </Td>
      <Td>
        <Select onChange={(e) => resolveSecondGen(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </Select>
      </Td>
    </Tr>
  );
};

export const TenantsInfo: FC<TenantsProps> = ({
  property,
  setProperty,
  addBlankTenantRow,
  selected,
  setSelected,
}) => {
  if (property.tenants.length === 0) {
    return (
      <center style={{ marginTop: "40px" }}>
        <EmptyState
          colorScheme="primary"
          icon={FiUsers}
          title="No tenants yet"
          description="You haven't added any tenants yet."
          actions={
            <>
              <Button colorScheme="primary" onClick={() => addBlankTenantRow()}>
                Add tenant
              </Button>
              <Button>Simple tenant add</Button>
            </>
          }
        />
      </center>
    );
  }

  return (
    <>
      <TableContainer h="100%">
        <Table variant="simple">
          <TableCaption>{property.name} Tenants</TableCaption>
          <Thead bgColor="gray.700">
            <Tr>
              <Th />
              <Th colSpan={5} color="white">
                General
              </Th>
              <Th colSpan={2} color="white">
                Leasing
              </Th>
              <Th colSpan={4} color="white">
                Rent
              </Th>
              <Th colSpan={7} color="white">
                Reimbursements
              </Th>
            </Tr>
          </Thead>
          <Thead>
            <Tr>
              <Th />

              <Th>Unit</Th>
              <Th isNumeric>Beds</Th>
              <Th isNumeric>Baths</Th>
              <Th isNumeric>Unit Size (SQFT)</Th>
              <Th isNumeric>Total Units</Th>
              <Th isNumeric>Units Initially Leased</Th>
              <Th isNumeric>Lease Up Pace (Units/MO)</Th>
              <Th isNumeric>In Place Rent ($)</Th>
              <Th>Roll To Market</Th>
              <Th isNumeric>Roll To Market Month</Th>
              <Th>Rent Growth</Th>
              <Th isNumeric>Utility Reimbursement (tenant/mo)</Th>
              <Th isNumeric>Make Ready New Lease Cost</Th>
              <Th isNumeric>Make Ready Renew Lease Cost</Th>
              <Th isNumeric>Free Rent New Lease</Th>
              <Th isNumeric>Free Rent Renew Lease</Th>
              <Th>Free Rent Second Gen Lease</Th>
              <Th>Downtime (Days)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {property.tenants.map((tenant: ApartmentTenant, index: number) => (
              <TenantRow
                property={property}
                setProperty={setProperty}
                index={index}
                key={index}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
