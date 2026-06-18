export function toPersianDigits(value: string | number) {
  return value.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit);
}

export function formatToman(value: number) {
  const formatted = new Intl.NumberFormat("fa-IR").format(value);
  return `${formatted} تومان`;
}
