import type { IAiProvider, ProviderContext } from "../types";
import type { LookupRequest, LookupResponse } from "@biblion/shared";
import { mockLookupResponse } from "@biblion/shared";

const withProviderMeta = (response: LookupResponse, provider: string): LookupResponse => ({
  ...response,
  providerMeta: {
    ...response.providerMeta,
    provider
  }
});

export class GoogleProvider implements IAiProvider {
  name = "google";

  async lookup(request: LookupRequest, _ctx: ProviderContext): Promise<LookupResponse> {
    return withProviderMeta(mockLookupResponse(request), this.name);
  }
}
