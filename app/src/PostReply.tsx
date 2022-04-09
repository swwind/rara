import { Reply } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";
import {
  TextAvatarType,
  TextContent,
  TextDateTime,
  TextEmail,
  TextHomepage,
  TextIAmARobot,
  TextNewReply,
  TextNickname,
  TextNoReply,
  TextReplies,
  TextReply,
} from "./Text";
import Card from "./ui/Card";
import CardTitle from "./ui/CardTitle";
import md5 from "md5";
import { useFetcher } from "remix";
import { Markdown } from "./Markdown";

export type PostReplyData = Pick<
  Reply,
  | "nickname"
  | "email"
  | "github"
  | "qq"
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
];

const randomHashColor = (name: string) => {
  const hash = name.split("").reduce((a, b) => {
    return (a + b.charCodeAt(0)) % colors.length;
  }, 0);
  return colors[hash];
};

const RepliesContext = createContext<{ replies: PostReplyData[] }>({
  replies: [],
});

type AvatarType = "qq" | "github" | "email";

function ReplyForm({ replyTo }: { replyTo?: number }) {
  const fetcher = useFetcher();
  const [avatarType, setAvatarType] = useState<AvatarType>("email");

  return (
    <fetcher.Form method="post" className="rara-reply-make-reply">
      <label htmlFor="nickname">
        <TextNickname />
      </label>
      <div>
        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder="Anonymous"
        />
      </div>
      <label htmlFor="homepage">
        <TextHomepage />
      </label>
      <div>
        <input
          type="text"
          name="homepage"
          id="homepage"
          placeholder="https://"
        />
      </div>
      <label htmlFor="avatar">
        <TextAvatarType />
      </label>
      <div>
        <select
          onChange={(e) => setAvatarType(e.currentTarget.value as AvatarType)}
          defaultValue={avatarType}
        >
          <option value="email">Gravatar (Email)</option>
          <option value="github">GitHub</option>
          <option value="qq">QQ</option>
        </select>
      </div>
      {avatarType === "email" && (
        <>
          <label htmlFor="email">
            <TextEmail />
          </label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Do you know Gravatar?"
            />
          </div>
        </>
      )}
      {avatarType === "github" && (
        <>
          <label htmlFor="github">GitHub</label>
          <div>
            <input
              type="text"
              name="github"
              id="github"
              placeholder="Your GitHub ID"
            />
          </div>
        </>
      )}
      {avatarType === "qq" && (
        <>
          <label htmlFor="qq">QQ</label>
          <div>
            <input type="text" name="qq" id="qq" placeholder="1145141919810" />
          </div>
        </>
      )}
      <label htmlFor="content">
        <TextContent />
      </label>
      <div>
        <textarea
          name="content"
          id="content"
          rows={4}
          placeholder="You can use **Markdown** here."
        />
      </div>
      <span></span>
      <label>
        <input type="checkbox" name="unused" />
        <span style={{ marginLeft: 5 }}>
          <TextIAmARobot />
        </span>
      </label>
      <span></span>
      <div>
        <input type="hidden" name="replyTo" value={replyTo ?? 0} />
        <button type="submit">
          <TextReply />
        </button>
      </div>
    </fetcher.Form>
  );
}

function ReplyList({ id }: { id: number }) {
  const { replies } = useContext(RepliesContext);

  const reply = replies.find((reply) => reply.id === id)!;
  const comments = replies.filter((reply) => reply.replyToId === id);
  const color = randomHashColor(reply.nickname);
  const avatar =
    (reply.email &&
      `https://gravatar.loli.net/avatar/${md5(reply.email)}?s=160&d=mm`) ||
    (reply.github && `https://avatars.githubusercontent.com/${reply.github}`) ||
    (reply.qq && `https://q1.qlogo.cn/g?b=qq&nk=${reply.qq}&s=160`);

  const [open, setOpen] = useState(false);

  return (
    <div className="rara-reply">
      <div
        className="rara-reply-avatar"
        style={{ backgroundColor: `var(--color-${color})` }}
      >
        {avatar ? (
          <img src={avatar} alt="avatar" />
        ) : (
          <span>{reply.nickname[0]}</span>
        )}
      </div>
      <div className="rara-reply-main">
        <div className="rara-reply-meta">
          {reply.homepage ? (
            <a
              href={reply.homepage}
              target="_blank"
              className="rara-reply-meta-nickname link"
              style={{ color: `var(--color-${color})` }}
              rel="noreferrer noopener"
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
        <div className="rara-reply-content">
          <Markdown>{reply.content}</Markdown>
        </div>
        <div className="rara-reply-actions">
          <TextDateTime time={new Date(reply.createdAt)} />
          <span
            className="rara-reply-action-reply"
            onClick={() => setOpen(!open)}
          >
            <TextReply />
          </span>
        </div>
        {open && <ReplyForm replyTo={reply.id} />}
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
          <span style={{ color: "var(--fg-color-2)" }}>
            <TextNoReply />
          </span>
        )}
        <h3>
          <TextNewReply />
        </h3>
        <ReplyForm />
      </RepliesContext.Provider>
    </Card>
  );
}
