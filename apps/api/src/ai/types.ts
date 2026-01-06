// Summary: Shared AI provider interfaces and context types for the API layer.
import type { LookupRequest, LookupResponse } from "@biblion/shared";

export type ProviderContext = {
  userId?: string;
  plan: "free" | "premium";
  providerAllowlist: string[];
};

export interface IAiProvider {
  name: string;
  lookup(request: LookupRequest, ctx: ProviderContext): Promise<LookupResponse>;
}
