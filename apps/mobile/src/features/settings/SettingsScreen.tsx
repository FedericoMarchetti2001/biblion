// Summary: Settings screen showing session state, entitlements, and dev toggles.
import { Platform, ScrollView, View } from "react-native";
import { Button, List, Switch, Text } from "react-native-paper";
import { useAppDispatch, useAppState } from "../../shared/state/AppState";
import { signInWithApple, signInWithGoogle, signOut } from "../../shared/auth/authService";

export const SettingsScreen = () => {
  const { settings, entitlements, session } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View>
        <Text variant="titleMedium">Account</Text>
        <List.Item
          title={session.isAuthenticated ? "Signed in" : "Signed out"}
          description={session.userId ? `User: ${session.userId}` : "Mock session"}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
          <Button mode="contained" onPress={signInWithGoogle}>
            Continue with Google
          </Button>
          {Platform.OS === "ios" ? (
            <Button mode="outlined" onPress={signInWithApple}>
              Continue with Apple
            </Button>
          ) : null}
          <Button mode="text" onPress={signOut} disabled={!session.isAuthenticated}>
            Sign out
          </Button>
        </View>
      </View>

      <View>
        <Text variant="titleMedium">Entitlements</Text>
        <List.Item
          title={entitlements.isPremium ? "Premium" : "Free"}
          description={`Providers: ${entitlements.providerAllowlist.join(", ")}`}
          left={(props) => <List.Icon {...props} icon="crown" />}
        />
      </View>

      <View>
        <Text variant="titleMedium">Developer</Text>
        <List.Item
          title="Use mock data"
          description="Toggle to switch between mock and live API"
          left={(props) => <List.Icon {...props} icon="flask" />}
          right={() => (
            <Switch
              value={settings.useMocks}
              onValueChange={(value) =>
                dispatch({ type: "SET_USE_MOCKS", payload: value })
              }
            />
          )}
        />
      </View>
    </ScrollView>
  );
};
