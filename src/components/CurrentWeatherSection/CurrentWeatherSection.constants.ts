export enum SuggestionType {
  COLD = "COLD",
  RAINING = "RAINING",
  SUNNY = "SUNNY",
}

export interface SuggestionData {
  suggestionText: string;
}

export const SUGGESTIONS_REGISTRY: Record<SuggestionType, SuggestionData> = {
  [SuggestionType.COLD]: { suggestionText: "Wear a warm jacket." },
  [SuggestionType.RAINING]: { suggestionText: "Take an umbrella." },
  [SuggestionType.SUNNY]: { suggestionText: "Wear sunglasses." },
};
