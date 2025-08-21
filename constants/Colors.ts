/**
 * Below are the themes that are used in the calculator app.
 * Each theme defines colors for the calculator interface including buttons, display, and background.
 */

export interface CalculatorTheme {
  name: string;
  displayName: string;
  colors: {
    background: string;
    displayText: string;
    numberButton: string;
    numberButtonText: string;
    operatorButton: string;
    operatorButtonText: string;
    functionButton: string;
    functionButtonText: string;
    themePickerBackground: string;
    themePickerText: string;
    themePickerBorder: string;
  };
}

export const THEMES: Record<string, CalculatorTheme> = {
  dark: {
    name: "dark",
    displayName: "Dark",
    colors: {
      background: "#000000",
      displayText: "#FFFFFF",
      numberButton: "#333333",
      numberButtonText: "#FFFFFF",
      operatorButton: "#FF9500",
      operatorButtonText: "#FFFFFF",
      functionButton: "#A6A6A6",
      functionButtonText: "#000000",
      themePickerBackground: "#1A1A1A",
      themePickerText: "#FFFFFF",
      themePickerBorder: "#333333",
    },
  },
  light: {
    name: "light",
    displayName: "Light",
    colors: {
      background: "#F5F5F5",
      displayText: "#000000",
      numberButton: "#FFFFFF",
      numberButtonText: "#000000",
      operatorButton: "#007AFF",
      operatorButtonText: "#FFFFFF",
      functionButton: "#D1D1D1",
      functionButtonText: "#000000",
      themePickerBackground: "#FFFFFF",
      themePickerText: "#000000",
      themePickerBorder: "#D1D1D1",
    },
  },
  girly: {
    name: "girly",
    displayName: "💕 Girly",
    colors: {
      background: "#FFB6C1",
      displayText: "#8B0040",
      numberButton: "#FFCCCB",
      numberButtonText: "#8B0040",
      operatorButton: "#FF69B4",
      operatorButtonText: "#FFFFFF",
      functionButton: "#DDA0DD",
      functionButtonText: "#8B0040",
      themePickerBackground: "#FFCCCB",
      themePickerText: "#8B0040",
      themePickerBorder: "#FF69B4",
    },
  },
  ocean: {
    name: "ocean",
    displayName: "🌊 Ocean",
    colors: {
      background: "#0F3460",
      displayText: "#E8F4FD",
      numberButton: "#16537e",
      numberButtonText: "#E8F4FD",
      operatorButton: "#00A8CC",
      operatorButtonText: "#FFFFFF",
      functionButton: "#533A7B",
      functionButtonText: "#E8F4FD",
      themePickerBackground: "#16537e",
      themePickerText: "#E8F4FD",
      themePickerBorder: "#00A8CC",
    },
  },
  sunset: {
    name: "sunset",
    displayName: "🌅 Sunset",
    colors: {
      background: "#2C1810",
      displayText: "#FFE4B5",
      numberButton: "#8B4513",
      numberButtonText: "#FFE4B5",
      operatorButton: "#FF6347",
      operatorButtonText: "#FFFFFF",
      functionButton: "#DEB887",
      functionButtonText: "#2C1810",
      themePickerBackground: "#8B4513",
      themePickerText: "#FFE4B5",
      themePickerBorder: "#FF6347",
    },
  },
};

// Legacy Colors export for compatibility
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
