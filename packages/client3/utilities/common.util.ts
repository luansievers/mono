export function formatNumber(value: number) {
  if (value > 1000000) {
    console.log(value);
    return `${(value / 1000000).toFixed(2)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
}
