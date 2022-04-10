import { Prism } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import night from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import { useContext } from "react";
import { ThemeContext } from "~/utils/context/theme";

type Props = {
  language: string;
  children: string;
};

export default function Highlighter({ children, language }: Props) {
  const { theme } = useContext(ThemeContext);

  return (
    <Prism
      style={theme === "dark" ? night : light}
      children={children}
      language={language}
    />
  );
}
