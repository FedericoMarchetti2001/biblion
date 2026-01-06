import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import type { Book } from "@biblion/shared";
import { listBooks } from "../../shared/api/client";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../app/AppNavigator";

export const BooksScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    listBooks()
      .then((data) => {
        if (mounted) {
          setItems(data.items);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, gap: 12 }}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card>
          <Card.Title title={item.title} subtitle={`${item.author ?? "Unknown"} ? ${item.language}`} />
          <Card.Content>
            <Text>Format: {item.format.toUpperCase()}</Text>
            <Text>Progress: {item.progressPercent ?? 0}%</Text>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Reader", { bookId: item.id, title: item.title })}
            >
              Open Reader
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
};
