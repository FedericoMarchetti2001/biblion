import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/app/AppNavigator";
import { darkTheme, lightTheme } from "./src/app/theme";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
