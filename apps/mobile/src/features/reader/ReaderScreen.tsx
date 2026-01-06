import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AiSheet } from "../ai/AiSheet";
import type { RootStackParamList } from "../../app/AppNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const sampleText =
  "Il etait une fois un petit prince qui habitait une planete a peine plus grande que lui.";

export const ReaderScreen = ({ route }: NativeStackScreenProps<RootStackParamList, "Reader">) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const words = useMemo(() => sampleText.split(" "), []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>{route.params.title}</Text>
      <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
        {words.map((word, index) => (
          <Pressable key={`${word}-${index}`} onPress={() => setSelectedWord(word)}>
            <Text style={{ fontSize: 18 }}>{word}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <AiSheet
        visible={Boolean(selectedWord)}
        selectedText={selectedWord ?? ""}
        onClose={() => setSelectedWord(null)}
      />
    </View>
  );
};
