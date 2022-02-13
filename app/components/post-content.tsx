import { LinksFunction } from "remix";

import katexStyle from "katex/dist/katex.min.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: katexStyle,
  },
];

type Props = {
  children: string;
};

export default function PostContent({ children }: Props) {
  return <article dangerouslySetInnerHTML={{ __html: children }} />;
}
