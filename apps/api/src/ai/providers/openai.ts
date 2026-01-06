// Summary: OpenAI provider using the Responses API to return structured lookup results.
import OpenAI from "openai";
import type { IAiProvider, ProviderContext } from "../types.js";
import type { LookupRequest, LookupResponse } from "@biblion/shared";
import { LookupResponseSchema } from "@biblion/shared";

const systemPrompt =
  "You are a linguistic assistant. Return strict JSON matching the LookupResponse schema.";

export class OpenAiProvider implements IAiProvider {
  name = "openai";

  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async lookup(request: LookupRequest, _ctx: ProviderContext): Promise<LookupResponse> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required for OpenAiProvider");
    }

    const response = await this.client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify({
            request,
            outputSchema: "LookupResponse"
          })
        }
      ],
      response_format: { type: "json_object" }
    });

    // Extract and validate the JSON payload to keep the client contract stable.
    const outputText = response.output_text ?? "";
    if (!outputText) {
      throw new Error("OpenAI response did not include JSON output");
    }
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(outputText);
    } catch (error) {
      throw new Error(`OpenAI response JSON parse failed: ${String(error)}`);
    }
    const parsed = LookupResponseSchema.safeParse(parsedJson);
    if (!parsed.success) {
      throw new Error("OpenAI response did not match LookupResponse schema");
    }

    return parsed.data;
  }
}
