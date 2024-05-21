import { Heading, Text } from "@chakra-ui/react";
import { Navbar, NavbarBrand } from "@saas-ui/react";
import { FC } from "react";
import Link from "next/link";

export const HomeNav: FC = () => {
  return (
    <Navbar borderBottomWidth="0px" position="sticky" top="0">
      <NavbarBrand style={{ justifyContent: "center" }}>
        <Heading
          size="md"
          color="primary"
          style={{ marginTop: "10px" }}
          fontWeight="100"
          as={Link}
          href="/"
          fontFamily="mono"
        >
          LIGHT&AIR
        </Heading>
      </NavbarBrand>
    </Navbar>
  );
};
