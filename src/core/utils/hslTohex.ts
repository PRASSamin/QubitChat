import * as convert from "color-convert";

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 *
 * @param theme object
 * @returns object
 */
export const hslTohex = (
  theme: Record<string, string>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(theme).map(([key, value]) => {
      const parts = value.split(" ").map(parseFloat);
      const isHSL = parts.length === 3 && parts.every((v) => !isNaN(v));

      return [
        toCamelCase(key.replace("--", "")),
        isHSL ? `#${convert.hsl.hex([parts[0], parts[1], parts[2]])}` : value,
      ];
    })
  );
