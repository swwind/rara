import { Markdown } from "./Markdown";

type Props = {
  children: string;
};

export default function PostContent({ children }: Props) {
  return (
    <article>
      <Markdown>{children}</Markdown>
    </article>
  );
}
