import type { IAiProvider, ProviderContext } from "./types";
import type { LookupRequest, LookupResponse } from "@biblion/shared";

export class ProviderRouter {
  private providers: Map<string, IAiProvider>;
  private defaultProvider: string;

  constructor(providers: IAiProvider[], defaultProvider = "mock") {
    this.providers = new Map(providers.map((provider) => [provider.name, provider]));
    this.defaultProvider = defaultProvider;
  }

  async lookup(request: LookupRequest, ctx: ProviderContext): Promise<LookupResponse> {
    const providerName = this.selectProvider(ctx);
    const provider = this.providers.get(providerName);
    if (!provider) {
      const fallback = this.providers.get(this.defaultProvider);
      if (!fallback) {
        throw new Error("No AI provider available");
      }
      return fallback.lookup(request, ctx);
    }
    return provider.lookup(request, ctx);
  }

  private selectProvider(ctx: ProviderContext): string {
    const allowlist = ctx.providerAllowlist.length ? ctx.providerAllowlist : [this.defaultProvider];
    if (ctx.plan === "premium") {
      return allowlist[0];
    }
    if (allowlist.includes(this.defaultProvider)) {
      return this.defaultProvider;
    }
    return allowlist[0];
  }
}
