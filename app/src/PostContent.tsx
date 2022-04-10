import { Markdown } from "./Markdown";

type Props = {
  children: string;
};

export default function PostContent({ children }: Props) {
  return (
    <article className="rara-article">
      <Markdown major={true}>{children}</Markdown>
    </article>
  );
}
