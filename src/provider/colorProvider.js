export default function getColor(value, minValue, maxValue, color1, color2) {
  // Certifique-se de que o valor esteja dentro do intervalo definido

  const clampedValue = Math.max(minValue, Math.min(value, maxValue));

  // Mapeia o valor para uma escala entre 0 e 1
  const scale = (clampedValue - minValue) / (maxValue - minValue);

  // Interpola entre as cores com base na escala
  const r = Math.floor(color1.r + (color2.r - color1.r) * scale);
  const g = Math.floor(color1.g + (color2.g - color1.g) * scale);
  const b = Math.floor(color1.b + (color2.b - color1.b) * scale);

  // Retorna a cor no formato "rgb"
  return `rgb(${r}, ${g}, ${b})`;
}
