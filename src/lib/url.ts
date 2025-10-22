/**
 * Get the public base URL for certificate verification links
 * Uses environment variable if set, otherwise falls back to current origin
 * @returns Public base URL
 */
export function getPublicBaseUrl(): string {
  const envBase = import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined;
  if (envBase && typeof envBase === 'string' && envBase.trim()) {
    // Remove trailing slash if present
    return envBase.replace(/\/+$/, '');
  }
  // Fallback to current origin (useful for development or when ENV not set)
  return window.location.origin;
}

/**
 * Get development environment status
 * @returns true if running on localhost
 */
export function isDevelopmentEnvironment(): boolean {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}
