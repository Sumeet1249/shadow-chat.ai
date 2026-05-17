import { BaseAdapter, GenerationRequestDto, GenerationResponseDto, StreamChunkDto } from './base.adapter';
import { Observable, Subject } from 'rxjs';

export class LocalLlmAdapter extends BaseAdapter {
  readonly modelProvider = 'local';
  readonly modelName = 'llama3.3-8b';

  async generate(dto: GenerationRequestDto): Promise<GenerationResponseDto> {
    const start = Date.now();
    
    // Simulate high-speed local inference (low latency, zero API cost)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tokensIn = Math.round(dto.prompt.length / 4);
    const text = `[Local Llama 3.3]: Handshake approved on local operator edge node. Local data residency confirmed.`;
    const tokensOut = Math.round(text.length / 4);
    
    const costUsd = 0.0; // Self-hosted

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
    const text = `[Local Llama 3.3 stream]: Connecting local model buffer. Executing prompt...`;
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
    }, 50); // Fast local execution

    return subject.asObservable();
  }
}
