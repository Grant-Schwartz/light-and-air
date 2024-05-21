import { extendTheme } from "@chakra-ui/react";
import { baseTheme } from "@saas-ui/react";
import CustomFont from "next/font/local";

export const sohne = CustomFont({
  src: [
    {
      path: "../fonts/sohne/sohne-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/sohne/sohne-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/sohne/sohne-extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/sohne/sohne-extralight-italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/sohne/sohne-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/sohne/sohne-light-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/sohne/sohne-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/sohne/sohne-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/sohne/sohne-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/sohne/sohne-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sohne",
});

export const sohne_mono = CustomFont({
  src: [
    {
      path: "../fonts/sohne_mono/sohnemono-logo.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-regular-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-extralight-italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-light-italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-medium-italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/sohne_mono/sohnemono-bold-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sohne-mono",
});

export const theme = extendTheme(
  {
    fonts: {
      heading: "var(--font-sohne)",
      body: "var(--font-sohne)",
      mono: "var(--font-sohne-mono)",
    },
    colors: {
      black: "#000000",
      primary: "#1E1F28",
      primary_hover: "#34353d",
      secondary: "#EDF5E0",
      secondary_hover: "#d5dcc9",
      tertiary: "#E8F6FA",
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "400",
        },
        variants: {
          primary: {
            bgColor: "primary",
            _hover: {
              bgColor: "primary_hover",
            },
            color: "white",
          },
          secondary: {
            bgColor: "secondary",
            _hover: {
              bgColor: "secondary_hover",
            },
            color: "primary",
          },
        },
      },
      Checkbox: {
        baseStyle: {
          iconColor: "secondary",
        },
        default: {
          iconColor: "secondary",
        },
      },
      Heading: {
        baseStyle: {
          fontFamily: "heading",
          fontWeight: "400",
        },
      },
    },
  },
  baseTheme
);
