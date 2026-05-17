import { Observable } from 'rxjs';

export interface GenerationRequestDto {
  prompt: string;
  personaId?: string;
  voiceStyle?: string;
  maxTokens?: number;
  temperature?: number;
  options?: Record<string, any>;
}

export interface GenerationResponseDto {
  text: string;
  modelName: string;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
}

export interface StreamChunkDto {
  text: string;
  isFinished: boolean;
  tokensCount?: number;
}

/**
 * Base AI Adapter Class
 * Defines the contract all LLM, Image, Video, and Audio adapters implement.
 */
export abstract class BaseAdapter {
  abstract readonly modelProvider: string;
  abstract readonly modelName: string;

  /**
   * Generates a completed synchronous output.
   */
  abstract generate(dto: GenerationRequestDto): Promise<GenerationResponseDto>;

  /**
   * Generates a live asynchronous reactive stream of tokens (SSE compatible).
   */
  abstract generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto>;
}
