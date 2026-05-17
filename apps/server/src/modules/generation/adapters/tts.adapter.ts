import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, of } from 'rxjs';

export class TtsAdapter extends BaseAdapter {
  readonly modelProvider = 'elevenlabs';
  readonly modelName = 'multilingual-v2';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const text = `https://cdn.shadowchat.ai/generated/voice_${Math.random().toString(36).substring(7)}.mp3`;

    return {
      text,
      modelName: this.modelName,
      latencyMs: Date.now() - start,
      tokensIn: 0,
      tokensOut: dto.prompt.length, // Priced per character
      costUsd: dto.prompt.length * 0.000015,
    };
  }

  generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto> {
    return of({
      text: 'Synthesizing voice stream...',
      isFinished: true,
    });
  }
}
