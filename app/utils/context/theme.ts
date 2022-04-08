import React from "react";

export type ThemeType = "light" | "dark";

export const ThemeContext = React.createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}>({
  theme: "light",
  setTheme: (theme: ThemeType) => {},
});
