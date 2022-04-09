import React from "react";

export type LanguageType = "en-US" | "zh-CN" | "ja-JP";

export const LanguageContext = React.createContext<{
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}>({ language: "zh-CN", setLanguage: () => {} });
