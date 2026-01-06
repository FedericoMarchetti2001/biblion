import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Modal, Portal, Text, ActivityIndicator, useTheme } from "react-native-paper";
import type { LookupResponse } from "@biblion/shared";
import { lookupAi } from "../../shared/api/client";

const buildPayload = (selectedText: string) => ({
  motherTongue: "en",
  targetLanguage: "fr",
  selectedText,
  context: {
    sentence: "Il etait une fois un petit prince qui habitait une planete." ,
    paragraph: "Il etait une fois un petit prince qui habitait une planete a peine plus grande que lui."
  },
  bookMeta: {
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupery",
    language: "fr"
  },
  mode: "quick" as const
});

export const AiSheet = ({
  visible,
  selectedText,
  onClose
}: {
  visible: boolean;
  selectedText: string;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LookupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const payload = useMemo(() => buildPayload(selectedText), [selectedText]);

  useEffect(() => {
    if (!visible || !selectedText) {
      return;
    }
    let mounted = true;
    setLoading(true);
    setError(null);
    setResponse(null);

    lookupAi(payload)
      .then((res) => {
        if (mounted) {
          setResponse(res);
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
  }, [payload, selectedText, visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          padding: 20,
          marginHorizontal: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          alignSelf: "stretch",
          position: "absolute",
          bottom: 0
        }}
      >
        <Text variant="titleMedium">{selectedText}</Text>
        {loading && (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
            <Text>Thinking...</Text>
          </View>
        )}
        {error && (
          <View style={{ paddingVertical: 16 }}>
            <Text>{error}</Text>
          </View>
        )}
        {response && (
          <View style={{ gap: 8, paddingVertical: 12 }}>
            <Text>Translation: {response.translation.text}</Text>
            <Text>Definition: {response.definition.text}</Text>
            <Text>Synonyms: {(response.synonyms ?? []).join(", ")}</Text>
          </View>
        )}
        <Button mode="outlined" onPress={onClose}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};
