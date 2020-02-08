export function createColor() {
  const hue = Math.round(Math.random() * 360);
  return `hsl(${hue}, 80%, 65%)`;
}
