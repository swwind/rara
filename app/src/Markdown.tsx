import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import React from "react";

type Props = {
  sanitize: boolean;
  children: string;
};

/**
 * @see https://www.npmjs.com/package/rehype-autolink-headings
 */
const autolinkHeadingOptions = {
  behavior: "append",
};

/**
 * @see https://www.npmjs.com/package/rehype-sanitize
 */
const sanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
  },
};

export function Markdown({ sanitize, children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath, remarkGemoji]}
      remarkRehypeOptions={{ allowDangerousHtml: true }}
      rehypePlugins={
        sanitize
          ? [
              rehypeKatex,
              rehypeRaw,
              rehypeHighlight,
              [rehypeSanitize, sanitizeOptions],
            ]
          : [
              rehypeKatex,
              rehypeRaw,
              rehypeHighlight,
              rehypeSlug,
              [rehypeAutolinkHeadings, autolinkHeadingOptions],
              // not sanitize in order to allow full html in markdown post
              // [rehypeSanitize, sanitizeOptions],
            ]
      }
      components={{
        a: ({
          children,
          ...props
        }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
          const externalProps = !props.href?.startsWith("#") && {
            target: "_blank",
            rel: "noreferrer noopener",
          };

          return (
            <a {...props} {...externalProps} className="color-blue underline">
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
