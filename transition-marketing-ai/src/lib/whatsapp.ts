const WHATSAPP_BASE = "https://wa.me";

const sanitizeNumber = (value: string | undefined) =>
  value?.replace(/[^0-9]/g, "") ?? "";

export const getWhatsAppUrl = () => {
  const number = sanitizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  const prefill = process.env.NEXT_PUBLIC_WHATSAPP_PREFILL?.trim();

  if (!number) {
    return WHATSAPP_BASE;
  }

  const base = `${WHATSAPP_BASE}/${number}`;

  if (!prefill) {
    return base;
  }

  const params = new URLSearchParams({ text: prefill });
  return `${base}?${params.toString()}`;
};
