import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, of } from 'rxjs';

export class ImageAdapter extends BaseAdapter {
  readonly modelProvider = 'midjourney';
  readonly modelName = 'flux-dev';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 3000)); // Image gen takes longer
    
    const text = `https://cdn.shadowchat.ai/generated/img_${Math.random().toString(36).substring(7)}.png`;

    return {
      text,
      modelName: this.modelName,
      latencyMs: Date.now() - start,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0.04, // Flat fee per image
    };
  }

  generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto> {
    return of({
      text: 'Generating image...',
      isFinished: true,
    });
  }
}
