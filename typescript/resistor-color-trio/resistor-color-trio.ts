export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]
export function decodedResistorValue([band1, band2, band3]: string[]): string {
  const ohms = (COLORS.indexOf(band1) * 10 + COLORS.indexOf(band2)) * (10 ** COLORS.indexOf(band3))
  if (ohms % 1000 == 0) {
    return `${ohms / 1000} kiloohms`
  } else {
    return `${ohms} ohms`
  }
}
