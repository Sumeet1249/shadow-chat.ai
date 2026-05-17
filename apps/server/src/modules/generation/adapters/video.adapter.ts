import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, of } from 'rxjs';

export class VideoAdapter extends BaseAdapter {
  readonly modelProvider = 'openai';
  readonly modelName = 'sora-video';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    await new Promise(resolve => setTimeout(resolve, 8000)); // Video generation is very slow
    
    const text = `https://cdn.shadowchat.ai/generated/video_${Math.random().toString(36).substring(7)}.mp4`;

    return {
      text,
      modelName: this.modelName,
      latencyMs: Date.now() - start,
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0.25, // Flat cost
    };
  }

  generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto> {
    return of({
      text: 'Queued for video rendering...',
      isFinished: true,
    });
  }
}
