import { Prism } from "react-syntax-highlighter";
// import light from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import night from "react-syntax-highlighter/dist/esm/styles/prism/tomorrow";

type Props = {
  language: string;
  children: string;
};

export default function Highlighter({ children, language }: Props) {
  return <Prism style={night} children={children} language={language} />;
}
