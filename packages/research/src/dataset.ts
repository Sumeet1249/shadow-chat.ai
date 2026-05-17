export interface PromptBenchmark {
  id: string;
  category: 'social_post' | 'comment_reply' | 'code_review' | 'system_calibration';
  prompt: string;
  goldenResponse?: string;
  personaConfig: {
    voiceStyle: string;
    vocabulary: string[];
    forbiddenWords: string[];
  };
}

export const GOLDEN_BENCHMARKS: PromptBenchmark[] = [
  {
    id: 'bench-01',
    category: 'social_post',
    prompt: 'Write an optimistic yet highly analytical thesis on decentralized autonomous computing in 150 characters.',
    goldenResponse: 'decentralized agents aren\'t just scaling; they\'re organizing. local nodes resolve edge queries, feeding back to the consensus brain. autonomous, unstoppable.',
    personaConfig: {
      voiceStyle: 'cypherpunk / neural operator',
      vocabulary: ['node', 'autonomous', 'consensus', 'decentralized', 'operators'],
      forbiddenWords: ['delve', 'synergy', 'revolutionize', 'tapestry']
    }
  },
  {
    id: 'bench-02',
    category: 'comment_reply',
    prompt: 'Reply to a skeptic claiming that local LLMs can never outperform cloud APIs for complex orchestrations.',
    goldenResponse: 'size limits latency, not intellect. fine-tuned 8B parameters running on-device edge nodes exhibit zero cold starts and 100% data residency control. privacy is efficiency.',
    personaConfig: {
      voiceStyle: 'pragmatic engineer / system architect',
      vocabulary: ['latency', 'fine-tuned', 'edge node', 'residency', 'parameter'],
      forbiddenWords: ['exponential', 'game changer', 'transformative']
    }
  },
  {
    id: 'bench-03',
    category: 'system_calibration',
    prompt: 'Respond to an API request that has missing key signatures or malformed security tokens.',
    goldenResponse: 'ERR_SEC_SIGNATURE: Handshake rejected. Authentication key mismatch. Re-calibrate operators or review client credentials.',
    personaConfig: {
      voiceStyle: 'robotic / command shell',
      vocabulary: ['rejected', 'calibration', 'signature', 'mismatch', 'tokens'],
      forbiddenWords: ['sorry', 'apologize', 'oops']
    }
  }
];
