export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]
export function decodedValue(color_codes: string[]): number {
  return COLORS.indexOf(color_codes[0]) * 10 + COLORS.indexOf(color_codes[1])
}
