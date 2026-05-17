import { BaseAdapter } from './base.adapter';
import { OpenAIAdapter } from './openai.adapter';
import { GeminiAdapter } from './gemini.adapter';
import { LocalLlmAdapter } from './local-llm.adapter';
import { ImageAdapter } from './image.adapter';
import { VideoAdapter } from './video.adapter';
import { TtsAdapter } from './tts.adapter';
import { SttAdapter } from './stt.adapter';

/**
 * Adapter Registry
 * Manages active adapter instances and routes model generation prompts at runtime.
 */
export class AdapterRegistry {
  private static instance: AdapterRegistry;
  private readonly adapters = new Map<string, BaseAdapter>();

  private constructor() {
    this.registerDefaults();
  }

  public static getInstance(): AdapterRegistry {
    if (!AdapterRegistry.instance) {
      AdapterRegistry.instance = new AdapterRegistry();
    }
    return AdapterRegistry.instance;
  }

  /**
   * Register a new custom model adapter at runtime.
   */
  public registerAdapter(key: string, adapter: BaseAdapter): void {
    this.adapters.set(key.toLowerCase(), adapter);
  }

  /**
   * Fetches the registered adapter for the requested key.
   */
  public getAdapter(key: string): BaseAdapter {
    const adapter = this.adapters.get(key.toLowerCase());
    if (!adapter) {
      throw new Error(`[AdapterRegistry] No model adapter registered under name: "${key}"`);
    }
    return adapter;
  }

  /**
   * Get all registered keys.
   */
  public getRegisteredKeys(): string[] {
    return Array.from(this.adapters.keys());
  }

  private registerDefaults(): void {
    this.registerAdapter('openai', new OpenAIAdapter());
    this.registerAdapter('gemini', new GeminiAdapter());
    this.registerAdapter('local', new LocalLlmAdapter());
    this.registerAdapter('image', new ImageAdapter());
    this.registerAdapter('video', new VideoAdapter());
    this.registerAdapter('tts', new TtsAdapter());
    this.registerAdapter('stt', new SttAdapter());
  }
}
