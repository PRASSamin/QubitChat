export type Hex = `#${string}`;
export type Hsl = `${number}${"," | " "} ${number}%${"," | " "} ${number}%`;

export interface ThemeProps {
  background: Hex | Hsl;
  foreground: Hex | Hsl;
  muted: Hex | Hsl;
  deepMuted: Hex | Hsl;
  mutedForeground: Hex | Hsl;
  popover: Hex | Hsl;
  popoverForeground: Hex | Hsl;
  card: Hex | Hsl;
  cardForeground: Hex | Hsl;
  border: Hex | Hsl;
  input: Hex | Hsl;
  primary: Hex | Hsl;
  primaryForeground: Hex | Hsl;
  secondary: Hex | Hsl;
  secondaryForeground: Hex | Hsl;
  accent: Hex | Hsl;
  accentForeground: Hex | Hsl;
  destructive: Hex | Hsl;
  destructiveForeground: Hex | Hsl;
  ring: Hex | Hsl;
  chart1: Hex | Hsl;
  chart2: Hex | Hsl;
  chart3: Hex | Hsl;
  chart4: Hex | Hsl;
  chart5: Hex | Hsl;
  radius: string;
}
