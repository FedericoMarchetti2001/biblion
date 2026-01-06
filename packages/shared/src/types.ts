export type BookFormat = "epub" | "pdf" | "mobi" | "other";

export type Book = {
  id: string;
  title: string;
  author?: string;
  language: string;
  format: BookFormat;
  coverUrl?: string;
  progressPercent?: number;
};

export type LookupMode = "quick" | "detailed";

export type LookupRequest = {
  motherTongue: string;
  targetLanguage: string;
  selectedText: string;
  context: {
    sentence: string;
    paragraph?: string;
    chapter?: string;
  };
  bookMeta?: {
    title?: string;
    author?: string;
    language?: string;
  };
  mode: LookupMode;
};

export type LookupResponse = {
  translation: {
    text: string;
    alternatives?: string[];
  };
  definition: {
    text: string;
    examples?: string[];
  };
  etymology?: {
    text: string;
  };
  synonyms?: string[];
  grammar?: {
    partOfSpeech?: string;
    genus?: string;
    plural?: string;
    conjugationHint?: string;
  };
  providerMeta: {
    provider: string;
    latencyMs: number;
    cached: boolean;
  };
};

export type BooksListResponse = {
  items: Book[];
};
