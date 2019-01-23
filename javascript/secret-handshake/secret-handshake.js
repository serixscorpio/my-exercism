export function secretHandshake(input) {
  if (!Number.isInteger(input)) throw new Error('Handshake must be a number');
  const result = [];
  /* eslint no-bitwise: [2, { allow: ["&"] }] */
  if (input & 0b1) result.push('wink');
  if (input & 0b10) result.push('double blink');
  if (input & 0b100) result.push('close your eyes');
  if (input & 0b1000) result.push('jump');
  if (input & 0b10000) result.reverse();
  return result;
}
