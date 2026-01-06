// Summary: Mock provider used for local development and testing.
import type { IAiProvider, ProviderContext } from "../types.js";
import type { LookupRequest, LookupResponse } from "@biblion/shared";
import { mockLookupResponse } from "@biblion/shared";

const withProviderMeta = (response: LookupResponse, provider: string): LookupResponse => ({
  ...response,
  providerMeta: {
    ...response.providerMeta,
    provider
  }
});

export class MockProvider implements IAiProvider {
  name = "mock";

  async lookup(request: LookupRequest, _ctx: ProviderContext): Promise<LookupResponse> {
    // Keep behavior deterministic for predictable UI tests.
    return withProviderMeta(mockLookupResponse(request), this.name);
  }
}
