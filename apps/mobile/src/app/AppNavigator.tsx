import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BooksScreen } from "../features/library/BooksScreen";
import { ReaderScreen } from "../features/reader/ReaderScreen";
import { Text, View } from "react-native";

export type RootStackParamList = {
  Tabs: undefined;
  Reader: { bookId: string; title: string };
};

export type TabParamList = {
  Continue: undefined;
  Books: undefined;
  Premium: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>{label} (placeholder)</Text>
  </View>
);

const TabsNavigator = () => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: true
    }}
  >
    <Tabs.Screen
      name="Continue"
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-open-page-variant" color={color} size={size} />
        )
      }}
    >
      {() => <PlaceholderScreen label="Continue" />}
    </Tabs.Screen>
    <Tabs.Screen
      name="Books"
      component={BooksScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bookshelf" color={color} size={size} />
        )
      }}
    />
    <Tabs.Screen
      name="Premium"
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="crown" color={color} size={size} />
        )
      }}
    >
      {() => <PlaceholderScreen label="Premium" />}
    </Tabs.Screen>
    <Tabs.Screen
      name="Settings"
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
        )
      }}
    >
      {() => <PlaceholderScreen label="Settings" />}
    </Tabs.Screen>
  </Tabs.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Reader" component={ReaderScreen} options={{ headerTitle: "Reader" }} />
    </Stack.Navigator>
  </NavigationContainer>
);
