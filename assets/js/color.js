export function createColor() {
  const hue = randomHue();
  return `hsl(${hue}, 80%, 65%)`;
}

export function randomHue() {
  return Math.ceil(Math.random() * 360);
}
