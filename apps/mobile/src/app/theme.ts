import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#2F3A2A",
    secondary: "#7A5C3E",
    background: "#F6F2EA",
    surface: "#FFFFFF",
    outline: "#D9D2C6"
  }
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#D6C3A0",
    secondary: "#C6A585",
    background: "#141414",
    surface: "#1D1D1D",
    outline: "#3A3A3A"
  }
};
