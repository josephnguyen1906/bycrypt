export function formatCurrency(
  amount: number,
  locale = "en-US",
  currency = "USD"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0, // Không có chữ số sau dấu phẩy
    maximumFractionDigits: 0, // Không có chữ số sau dấu phẩy
  }).format(amount);
}
