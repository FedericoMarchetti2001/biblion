// Summary: DeepL provider stub (returns mock responses for now).
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

export class DeepLProvider implements IAiProvider {
  name = "deepl";

  async lookup(request: LookupRequest, _ctx: ProviderContext): Promise<LookupResponse> {
    // TODO: Replace with real DeepL integration when configured.
    return withProviderMeta(mockLookupResponse(request), this.name);
  }
}
