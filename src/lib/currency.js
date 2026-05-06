export const USD_TO_INR = 84;

export function formatINR(usdPrice) {
  const inr = usdPrice * USD_TO_INR;
  return `₹${inr.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
