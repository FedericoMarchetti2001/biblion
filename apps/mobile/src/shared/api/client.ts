import { appConfig } from "../../app/config";
import type { BooksListResponse, LookupRequest, LookupResponse } from "@biblion/shared";
import { mockBooks, mockLookupResponse } from "@biblion/shared";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const listBooks = async (): Promise<BooksListResponse> => {
  if (appConfig.useMocks) {
    await delay(250);
    return { items: mockBooks };
  }
  const response = await fetch(`${appConfig.apiUrl}/books`);
  if (!response.ok) {
    throw new Error("Failed to load books");
  }
  return response.json();
};

export const lookupAi = async (payload: LookupRequest): Promise<LookupResponse> => {
  if (appConfig.useMocks) {
    await delay(400);
    return mockLookupResponse(payload);
  }
  const response = await fetch(`${appConfig.apiUrl}/ai/lookup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("AI lookup failed");
  }
  return response.json();
};
