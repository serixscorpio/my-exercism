export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]
export function decodedValue([band1, band2]: string[]): number {
  return COLORS.indexOf(band1) * 10 + COLORS.indexOf(band2)
}
