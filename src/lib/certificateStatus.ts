/**
 * Utility functions for certificate status management
 * Status is computed in real-time based on expiry_date
 */

export type CertificateStatus = 'active' | 'expired';

/**
 * Determines certificate status by comparing expiry date with current date
 * @param expiryDate - The expiry date string from the certificate
 * @returns 'active' if not expired, 'expired' if past expiry date
 */
export function getCertificateStatus(expiryDate: string): CertificateStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day
  
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0); // Reset to start of day
  
  return today <= expiry ? 'active' : 'expired';
}

/**
 * Returns Tailwind CSS classes for status badge styling
 * @param status - The certificate status
 * @returns Tailwind class string for badge styling
 */
export function getStatusBadgeColor(status: CertificateStatus): string {
  return status === 'active' 
    ? 'bg-green-100 text-green-800 border-green-300'
    : 'bg-red-100 text-red-800 border-red-300';
}

/**
 * Returns human-readable label for status
 * @param status - The certificate status
 * @returns Display label for the status
 */
export function getStatusLabel(status: CertificateStatus): string {
  return status === 'active' ? 'Active' : 'Expired';
}
