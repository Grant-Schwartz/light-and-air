import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { theme as baseTheme } from "@saas-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({ config }, baseTheme);

export default theme;
