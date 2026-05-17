import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, Subject } from 'rxjs';

export class OpenAIAdapter extends BaseAdapter {
  readonly modelProvider = 'openai';
  readonly modelName = 'gpt-4o';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    
    // Simulate real OpenAI API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const tokensIn = Math.round(dto.prompt.length / 4);
    const text = `[OpenAI gpt-4o]: Autonomous consensus is established. Storing decentralized records in the neural vaults...`;
    const tokensOut = Math.round(text.length / 4);
    
    // Pricing: $2.50 / 1M input, $10.00 / 1M output
    const costUsd = (tokensIn * 2.50 + tokensOut * 10.00) / 1_000_000;

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
    const text = `[OpenAI gpt-4o stream]: Decentralized agents executing node calibration sequence. Consensus approved.`;
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
    }, 100);

    return subject.asObservable();
  }
}
