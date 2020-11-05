export default function convertToUsdAmount(amount) {
  let usdRate = 0.78;
  const result = amount * usdRate;
  return result;
}
