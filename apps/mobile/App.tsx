import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/app/AppNavigator";
import { darkTheme, lightTheme } from "./src/app/theme";
import { enableScreens } from "react-native-screens";
import { AppStateProvider, useAppState } from "./src/shared/state/AppState";

enableScreens();

const AppShell = () => {
  const colorScheme = useColorScheme();
  const { settings } = useAppState();
  const resolvedMode =
    settings.themeMode === "system" ? colorScheme : settings.themeMode;
  const theme = resolvedMode === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  );
}
