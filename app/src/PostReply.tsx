import { Reply } from "@prisma/client";
import { createContext, useContext } from "react";
import { TextDateTime, TextNoReply, TextReplies } from "./Text";
import Card from "./ui/Card";
import CardTitle from "./ui/CardTitle";

export type PostReplyData = Pick<
  Reply,
  | "nickname"
  | "email"
  | "homepage"
  | "createdAt"
  | "content"
  | "id"
  | "replyToId"
>;

const colors = [
  "pink",
  "red",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
  "black",
  "white",
];

const randomHashColor = (name: string) => {
  const hash = name.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colors[Math.abs(hash) % colors.length];
};

const RepliesContext = createContext<{ replies: PostReplyData[] }>({
  replies: [],
});

function ReplyList({ id }: { id: number }) {
  const { replies } = useContext(RepliesContext);

  const reply = replies.find((reply) => reply.id === id)!;
  const comments = replies.filter((reply) => reply.replyToId === id);
  const color = randomHashColor(reply.nickname);

  return (
    <div className="rara-reply">
      <div className="rara-reply-avatar"></div>
      <div className="rara-reply-main">
        <div className="rara-reply-meta">
          {reply.homepage ? (
            <a
              href={reply.homepage}
              target="_blank"
              className="rara-reply-meta-nickname link"
              style={{ color: `var(--color-${color})` }}
              rel="noreferrer"
            >
              {reply.nickname}
            </a>
          ) : (
            <span
              className="rara-reply-meta-nickname"
              style={{ color: `var(--color-${color})` }}
            >
              {reply.nickname}
            </span>
          )}
        </div>
        <div className="rara-reply-content">{reply.content}</div>
        <div className="rara-reply-actions">
          <TextDateTime time={new Date(reply.createdAt)} />
        </div>
        <div className="rara-reply-comments">
          {comments.map((comment) => (
            <ReplyList key={comment.id} id={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PostReply({ replies }: { replies: PostReplyData[] }) {
  const majorReplies = replies.filter((reply) => reply.replyToId === null);

  return (
    <Card header={<CardTitle title={<TextReplies prefix="💬 " />} />}>
      <RepliesContext.Provider value={{ replies }}>
        {majorReplies.length > 0 ? (
          majorReplies.map((reply) => (
            <ReplyList key={reply.id} id={reply.id} />
          ))
        ) : (
          <TextNoReply />
        )}
      </RepliesContext.Provider>
    </Card>
  );
}
