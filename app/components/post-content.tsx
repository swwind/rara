import { LinksFunction } from 'remix';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import katexStyle from 'katex/dist/katex.min.css';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: katexStyle,
  },
];

type Props = {
  children: string;
}

export default function PostContent({ children }: Props) {
  return (
    <article>
      <ReactMarkdown
        children={children}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </article>
  );
}
