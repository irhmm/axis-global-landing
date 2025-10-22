import QRCode from 'qrcode';
import { getPublicBaseUrl } from './url';

/**
 * Generate QR code as data URL from certificate number
 * @param certificateNumber - The certificate number to encode
 * @returns Promise<string> - QR code as base64 data URL
 */
export async function generateQRCode(certificateNumber: string): Promise<string> {
  try {
    // Use public base URL - automatically converts preview domains to public domain
    const baseUrl = getPublicBaseUrl();
    const verificationUrl = `${baseUrl}/verify?cert=${encodeURIComponent(certificateNumber)}`;
    
    const qrCodeDataURL = await QRCode.toDataURL(verificationUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Download QR code as PNG file
 * @param certificateNumber - The certificate number for filename
 * @param qrCodeDataURL - The QR code data URL to download
 */
export function downloadQRCode(certificateNumber: string, qrCodeDataURL: string): void {
  const link = document.createElement('a');
  link.href = qrCodeDataURL;
  link.download = `QR-${certificateNumber}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
