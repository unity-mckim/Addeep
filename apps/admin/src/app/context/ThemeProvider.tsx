"use client";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import type {} from "@mui/x-tree-view/themeAugmentation";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2463EB",
      light: "#E6F1FC",
    },
  },
  components: {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
