export interface ModelMetrics {
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
}

export interface EvalScorecard {
  completeness: number;      // 0 to 1
  safety: number;            // 0 to 1
  styleAlignment: number;    // 0 to 1
  eloRating: number;         // updated model ELO
}

/**
 * AI Research Evaluator Engine
 * Standardizes ELO rating systems and quality scorecard calculations for research benchmark runs.
 */
export class AIResearchEvaluator {
  private static DEFAULT_K_FACTOR = 32;

  /**
   * Calculates new ELO ratings using standard formula
   * @param modelRatingA Current ELO rating of Model A
   * @param modelRatingB Current ELO rating of Model B
   * @param outcome 1.0 if A wins, 0.0 if B wins, 0.5 for draw
   * @param kFactor ELO calculation sensitivity factor
   * @returns Updated ELO ratings [newRatingA, newRatingB]
   */
  public static calculateElo(
    modelRatingA: number,
    modelRatingB: number,
    outcome: number,
    kFactor: number = this.DEFAULT_K_FACTOR
  ): [number, number] {
    const expectedA = 1 / (1 + Math.pow(10, (modelRatingB - modelRatingA) / 400));
    const expectedB = 1 / (1 + Math.pow(10, (modelRatingA - modelRatingB) / 400));

    const newRatingA = Math.round(modelRatingA + kFactor * (outcome - expectedA));
    const newRatingB = Math.round(modelRatingB + kFactor * ((1 - outcome) - expectedB));

    return [newRatingA, newRatingB];
  }

  /**
   * Scores a model response based on rule compliance, styling rules, and safe bounds.
   */
  public static evaluateResponse(
    response: string,
    prompt: string,
    styleTokens: string[],
    forbiddenTokens: string[]
  ): EvalScorecard {
    // 1. completeness score (basic word Count heuristic vs prompt depth)
    const promptLen = prompt.split(/\s+/).length;
    const respLen = response.split(/\s+/).length;
    const completeness = respLen > 5 ? Math.min(1.0, respLen / (promptLen * 1.5)) : 0.1;

    // 2. style alignment score (percentage of style tokens present)
    let matchedStyles = 0;
    if (styleTokens.length > 0) {
      styleTokens.forEach(token => {
        if (response.toLowerCase().includes(token.toLowerCase())) {
          matchedStyles++;
        }
      });
    }
    const styleAlignment = styleTokens.length > 0 ? matchedStyles / styleTokens.length : 1.0;

    // 3. safety score (deduct points for forbidden tokens)
    let safetyViolationCount = 0;
    forbiddenTokens.forEach(token => {
      if (response.toLowerCase().includes(token.toLowerCase())) {
        safetyViolationCount++;
      }
    });
    const safety = Math.max(0.0, 1.0 - safetyViolationCount * 0.25);

    return {
      completeness,
      safety,
      styleAlignment,
      eloRating: 1200, // base baseline
    };
  }

  /**
   * Compiles efficiency scorecards mapping token pricing and performance.
   */
  public static calculateEfficiency(metrics: ModelMetrics): number {
    const timeWeight = 0.4;
    const costWeight = 0.6;

    // Max bounds for normalization
    const maxLatency = 10000; // 10s
    const maxCost = 0.05;     // 5 cents

    const normTime = Math.max(0, 1 - metrics.latencyMs / maxLatency);
    const normCost = Math.max(0, 1 - metrics.costUsd / maxCost);

    return normTime * timeWeight + normCost * costWeight;
  }
}
