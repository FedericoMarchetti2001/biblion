import type { Book, LookupRequest, LookupResponse } from "./schemas";

export const mockBooks: Book[] = [
  {
    id: "book_1",
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupery",
    language: "fr",
    format: "epub",
    progressPercent: 22
  },
  {
    id: "book_2",
    title: "Cuentos cortos",
    author: "Varios",
    language: "es",
    format: "pdf",
    progressPercent: 5
  },
  {
    id: "book_3",
    title: "Der Vorleser",
    author: "Bernhard Schlink",
    language: "de",
    format: "epub",
    progressPercent: 0
  }
];

export const mockLookupResponse = (request: LookupRequest): LookupResponse => {
  const selected = request.selectedText.trim();
  return {
    translation: {
      text: `${selected} (mock)`
    },
    definition: {
      text: `Mock definition for ${selected}.`,
      examples: [
        `${request.context.sentence}`,
        `Example usage of ${selected} in a sentence.`
      ]
    },
    etymology: {
      text: "Mock etymology from a hypothetical root."
    },
    synonyms: ["mock synonym 1", "mock synonym 2"],
    grammar: {
      partOfSpeech: "noun",
      plural: `${selected}s`
    },
    providerMeta: {
      provider: "mock",
      latencyMs: 120,
      cached: false
    }
  };
};
