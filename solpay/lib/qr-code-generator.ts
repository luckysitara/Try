import QRCode from "qrcode"

export async function generatePaymentQRCode(paymentLinkId: string): Promise<string> {
  const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/${paymentLinkId}`
  return QRCode.toDataURL(paymentUrl)
}

