/**
 * Mask an API key — shows only last 4 chars.
 * e.g. "sk-abcdef1234" → "••••••••1234"
 */
export function maskKey(key: string): string {
  if (!key || key.length <= 4) return '••••'
  return `••••••••${key.slice(-4)}`
}

/**
 * Format a number with locale-appropriate separators
 */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/**
 * Truncate string to maxLength with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

/**
 * Easing function: cubic ease out (used in useCountUp)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Check if a string is valid JSON
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

/**
 * Block private/internal IP ranges (SEC-5 — DevSandbox protection)
 */
const PRIVATE_IP_PATTERNS = [
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^127\./,
  /^169\.254\./,
  /^::1$/,
  /^localhost$/i,
]

export function isPrivateIP(host: string): boolean {
  return PRIVATE_IP_PATTERNS.some(pattern => pattern.test(host))
}
