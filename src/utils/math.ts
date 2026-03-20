// stats-app/src/utils/math.ts

/**
 * Gamma function approximation using Lanczos method
 */
export function gamma(z: number): number {
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  let x = p[0];
  for (let i = 1; i < g + 2; i++) x += p[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

/**
 * Normal Distribution PDF
 */
export function normalPDF(x: number, mu: number, sigma: number): number {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
  );
}

/**
 * Student's t-distribution PDF
 */
export function tPDF(x: number, df: number): number {
  const term1 = gamma((df + 1) / 2) / (Math.sqrt(df * Math.PI) * gamma(df / 2));
  const term2 = Math.pow(1 + (x * x) / df, -(df + 1) / 2);
  return term1 * term2;
}

/**
 * Chi-squared distribution PDF
 */
export function chi2PDF(x: number, df: number): number {
  if (x < 0) return 0;
  if (x === 0 && df === 2) return 0.5;
  if (x === 0 && df < 2) return Infinity;
  const term1 = 1 / (Math.pow(2, df / 2) * gamma(df / 2));
  const term2 = Math.pow(x, df / 2 - 1) * Math.exp(-x / 2);
  return term1 * term2;
}

/**
 * F-distribution PDF
 */
export function fPDF(x: number, df1: number, df2: number): number {
  if (x <= 0) return 0;
  const num = Math.pow(df1 * x, df1) * Math.pow(df2, df2);
  const den = Math.pow(df1 * x + df2, df1 + df2);
  const term1 = Math.sqrt(num / den);
  const beta = (gamma(df1 / 2) * gamma(df2 / 2)) / gamma((df1 + df2) / 2);
  return term1 / (x * beta);
}
