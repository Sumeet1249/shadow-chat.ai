import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, of } from 'rxjs';

export class SttAdapter extends BaseAdapter {
  readonly modelProvider = 'deepgram';
  readonly modelName = 'nova-2';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // dto.prompt here represents raw audio URL or placeholder
    const text = `Consensus node operational status verified. Signal feed calibrated.`;

    return {
      text,
      modelName: this.modelName,
      latencyMs: Date.now() - start,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0.004, // flat fee per min
    };
  }

  generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto> {
    return of({
      text: 'Transcribing streaming audio...',
      isFinished: true,
    });
  }
}
