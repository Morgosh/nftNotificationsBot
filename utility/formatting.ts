export function toPrecisionNumber(value: string | number, precision = 5) {
  return Number(Number(value).toPrecision(precision))
}

export function toPrecisionBigInt(value: bigint, significantDigits = 5): bigint {
  const len = value.toString().length
  if (len <= significantDigits) return value
  const p = BigInt(Math.pow(10, len - significantDigits))
  return (value + p / BigInt(2)) / p * p
}

export function multiplyBigInt(a: bigint, b: number, precision = 8): bigint {
  const p = Math.pow(10, precision)
  return a * BigInt(Math.round(b * p)) / BigInt(p)
}
