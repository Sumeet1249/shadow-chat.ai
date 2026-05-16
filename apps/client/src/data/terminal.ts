export const RESPONSES: Record<string, string> = {
  help:         '  Available commands: help, status, generate, deploy, list-nodes, clear, exit\n  Type any command to execute.',
  status:       '  ▸ NEURAL ENGINE: ONLINE\n  ▸ ACTIVE NODES: 4/6\n  ▸ LATENCY: 142ms avg\n  ▸ UPTIME: 14d 7h 23m',
  generate:     '  ▸ Initializing persona: Nexus Architect\n  ▸ Platform: Twitter\n  ▸ Generating reply...\n  ▸ Output: "The real bottleneck in AI isn\'t compute—it\'s orchestration at scale."\n  ▸ Done. [142ms]',
  deploy:       '  ▸ Deploying NODE-GAMMA to Reddit...\n  ▸ Persona: Ghost Analyst\n  ▸ Status: ACTIVE\n  ▸ Health: 100%',
  'list-nodes': '  ▸ NODE-ALPHA   | ACTIVE  | Twitter  | Health: 99%\n  ▸ NODE-BETA    | ACTIVE  | LinkedIn | Health: 97%\n  ▸ NODE-GAMMA   | IDLE    | Reddit   | Health: 100%\n  ▸ NODE-DELTA   | ACTIVE  | Discord  | Health: 94%\n  ▸ NODE-EPSILON | ERROR   | N/A      | Health: 0%\n  ▸ NODE-ZETA    | ACTIVE  | Email    | Health: 96%',
  'memory scan':'  ▸ Scanning memory context...\n  ▸ Entries: 847\n  ▸ Active contexts: 12\n  ▸ Memory index: CLEAN',
  analytics:    '  ▸ Pulling analytics data...\n  ▸ Total replies (7d): 18,420\n  ▸ Avg engagement: 8.7%\n  ▸ Top platform: Twitter (44%)',
  'vault check':'  ▸ Verifying key vault...\n  ▸ OpenAI: ✓ VALID\n  ▸ Anthropic: ✓ VALID\n  ▸ Gemini: ✓ VALID\n  ▸ All keys nominal.',
  clear:        '__clear__',
}
