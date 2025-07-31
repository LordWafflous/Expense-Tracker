// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
};

const mikuTheme = {
  primary: "#00C9C8",       // Miku turquoise
  background: "#E6FAF9",     // Light turquoise background
  text: "#1A4D4A",           // Dark teal
  border: "#B3EDE9",         // Soft border
  white: "#FFFFFF",
  textLight: "#69D6CF",      // Lighter text accent
  expense: "#FF5C8D",        // Pinkish red
  income: "#2ECC71",         // Soft green
  card: "#FFFFFF",
  shadow: "#000000",
};

const tetoTheme = {
  primary: "#ff0045",      // Strong magenta-red (core Teto color)
  background: "#FFF4F6",     // Very pale rose
  text: "#3E0D23",           // Deep wine color for contrast
  border: "#F8BBD0",         // Soft pink border
  white: "#FFFFFF",
  textLight: "#E91E63",      // Vivid pink highlight
  expense: "#B71C1C",        // Deep crimson red
  income: "#43A047",         // Strong green for balance
  card: "#FFFFFF",
  shadow: "#000000",
};


export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  miku: mikuTheme,
  teto: tetoTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.teto;