"use client";

import { NextLink } from "@/components/Link/link";
import Toolbar from "@/components/Toolbar";
import PropertyContext from "@/utils/PropertyContext";
import { founders } from "@/utils/fonts";
import { Box, Heading } from "@chakra-ui/react";
import "@silevis/reactgrid/styles.css";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  NavItem,
  NavGroup,
} from "@saas-ui/react";
import { usePathname } from "next/navigation";
import {
  FiUsers,
  FiDollarSign,
  FiPieChart,
  FiBox,
  FiBook,
  FiArchive,
  FiHelpCircle,
  FiAtSign,
} from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AppShell
      navbar={
        <Box
          py="2"
          px="4"
          display="flex"
          alignItems="center"
          height="50px"
          backgroundImage="/bg.png"
          backgroundPosition="center"
        >
          <Heading
            className={founders.className}
            paddingTop="8px"
            fontWeight="500"
            letterSpacing="-0.075rem"
            lineHeight="none"
            color="white"
          >
            Light&Air{" "}
            <Heading as="span" className={founders.className} fontWeight="300">
              | Multifamily Demo
            </Heading>
          </Heading>
        </Box>
      }
      sidebar={
        <Sidebar>
          <SidebarSection flex="1">
            <NavGroup title="Data">
              <NavItem
                icon={<FiBox />}
                isActive={pathname == "/property" ? true : false}
                as={NextLink}
                href="/property"
              >
                Property
              </NavItem>
              <NavItem
                icon={<FiUsers />}
                isActive={pathname == "/property/tenants" ? true : false}
                as={NextLink}
                href="/property/tenants"
              >
                Tenants
              </NavItem>
              <NavItem
                icon={<FiDollarSign />}
                isActive={pathname == "/property/income" ? true : false}
                as={NextLink}
                href="/property/income"
              >
                Income
              </NavItem>
              <NavItem
                icon={<FiPieChart />}
                isActive={pathname == "/property/expenses" ? true : false}
                as={NextLink}
                href="/property/expenses"
              >
                Expenses
              </NavItem>
            </NavGroup>
            <NavGroup title="Results">
              <NavItem
                icon={<FiBook />}
                isActive={pathname == "/property/reports" ? true : false}
                as={NextLink}
                href="/property/reports"
              >
                Reports
              </NavItem>
              <NavItem
                icon={<FiArchive />}
                isActive={pathname == "/property/audit" ? true : false}
                as={NextLink}
                href="/property/audit"
              >
                Audit
              </NavItem>
            </NavGroup>
          </SidebarSection>
          <SidebarSection>
            <NavItem icon={<FiHelpCircle />}>Documentation</NavItem>
            <NavItem icon={<FiAtSign />}>Contact Us</NavItem>
          </SidebarSection>
        </Sidebar>
      }
      height="$100vh"
    >
      <PropertyContext>{children}</PropertyContext>
    </AppShell>
  );
}
