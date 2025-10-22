/**
 * Get the public base URL for certificate verification links
 * Automatically converts preview/editor domains to public domain
 * @returns Public base URL
 */
export function getPublicBaseUrl(): string {
  const { protocol, hostname } = window.location;
  
  // If on a Lovable preview/editor domain (.lovable.app or .lovable.dev),
  // convert to the public domain (.lovableproject.com)
  if (hostname.endsWith('.lovable.app') || hostname.endsWith('.lovable.dev')) {
    // Extract the subdomain (everything before .lovable.app/.lovable.dev)
    const subdomain = hostname.split('.')[0];
    return `${protocol}//${subdomain}.lovableproject.com`;
  }
  
  // For custom domains or already on .lovableproject.com, use as-is
  return window.location.origin;
}

/**
 * Get development environment status
 * @returns true if running on localhost
 */
export function isDevelopmentEnvironment(): boolean {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}
