import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, Subject } from 'rxjs';

export class GeminiAdapter extends BaseAdapter {
  readonly modelProvider = 'google';
  readonly modelName = 'gemini-1.5-pro';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    
    // Simulate real Gemini API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const tokensIn = Math.round(dto.prompt.length / 4);
    const text = `[Gemini 1.5 Pro]: Analyzing node graphs... Context window loaded successfully. Executing decentralized workflows.`;
    const tokensOut = Math.round(text.length / 4);
    
    // Pricing: $1.25 / 1M input, $5.00 / 1M output
    const costUsd = (tokensIn * 1.25 + tokensOut * 5.00) / 1_000_000;

    return {
      text,
      modelName: this.modelName,
      latencyMs: Date.now() - start,
      tokensIn,
      tokensOut,
      costUsd,
    };
  }

  generateStream(dto: GenerationRequestDto): Observable<StreamChunkDto> {
    const subject = new Subject<StreamChunkDto>();
    const text = `[Gemini 1.5 Pro stream]: Initializing multimodal pipeline. Analyzing video frames... Complete.`;
    const words = text.split(' ');
    let currentWordIndex = 0;

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        subject.next({
          text: words[currentWordIndex] + ' ',
          isFinished: false,
        });
        currentWordIndex++;
      } else {
        subject.next({
          text: '',
          isFinished: true,
          tokensCount: Math.round(text.length / 4),
        });
        subject.complete();
        clearInterval(interval);
      }
    }, 90);

    return subject.asObservable();
  }
}
