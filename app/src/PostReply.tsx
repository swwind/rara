import { Reply } from "@prisma/client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  TextAvatarType,
  TextCaptcha,
  TextClose,
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
import { UserInfoContext } from "~/utils/context/userinfo";
import Space from "./ui/Space";

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
  | "replyTo"
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

function ReplyForm({
  replyTo,
  onClose,
}: {
  replyTo?: number;
  onClose?: () => void;
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [avatarType, setAvatarType] = useState<AvatarType>(userInfo.avatarType);

  useEffect(() => {
    if (!isSubmitting) {
      if (contentRef.current) {
        contentRef.current.value = "";
      }
    }
  }, [isSubmitting]);

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
          defaultValue={userInfo.nickname}
          onChange={(e) => setUserInfo({ nickname: e.currentTarget.value })}
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
          defaultValue={userInfo.homepage}
          onChange={(e) => setUserInfo({ homepage: e.currentTarget.value })}
        />
      </div>
      <label htmlFor="avatar">
        <TextAvatarType />
      </label>
      <div>
        <select
          onChange={(e) => {
            const avatarType = e.currentTarget.value as AvatarType;
            setAvatarType(avatarType);
            setUserInfo({ avatarType });
          }}
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
              defaultValue={userInfo.email}
              onChange={(e) => setUserInfo({ email: e.currentTarget.value })}
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
              defaultValue={userInfo.github}
              onChange={(e) => setUserInfo({ github: e.currentTarget.value })}
            />
          </div>
        </>
      )}
      {avatarType === "qq" && (
        <>
          <label htmlFor="qq">QQ</label>
          <div>
            <input
              type="text"
              name="qq"
              id="qq"
              placeholder="1145141919810"
              defaultValue={userInfo.qq}
              onChange={(e) => setUserInfo({ qq: e.currentTarget.value })}
            />
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
          ref={contentRef}
          placeholder="You can use **Markdown** here."
          required
        />
      </div>
      <label htmlFor="captcha">
        <TextCaptcha />
      </label>
      <div>
        <datalist id="answers">
          <option value="0.3"></option>
          <option value="0.30000000000000004"></option>
          <option value="0.10.2"></option>
        </datalist>
        <input
          id="captcha"
          name="captcha"
          type="text"
          list="answers"
          placeholder="0.1 + 0.2 ="
          required
        />
      </div>
      <span></span>
      <Space direction="horizontal" gap={10}>
        <input type="hidden" name="replyTo" value={replyTo ?? ""} />
        <button type="submit" disabled={isSubmitting}>
          <TextReply />
        </button>
        {onClose && (
          <button type="button" onClick={onClose}>
            <TextClose />
          </button>
        )}
      </Space>
    </fetcher.Form>
  );
}

function ReplyList({ id }: { id: number }) {
  const { replies } = useContext(RepliesContext);

  const reply = replies.find((reply) => reply.id === id)!;
  const comments = replies.filter((reply) => reply.replyTo === id);
  const color = randomHashColor(reply.nickname);
  const avatar =
    (reply.qq && `https://q1.qlogo.cn/g?b=qq&nk=${reply.qq}&s=160`) ||
    (reply.github && `https://avatars.githubusercontent.com/${reply.github}`) ||
    (reply.email &&
      `https://gravatar.loli.net/avatar/${md5(reply.email)}?s=160&d=mm`);

  const [open, setOpen] = useState(false);

  return (
    <div className="rara-reply" id={`reply-${reply.id}`}>
      <div className={`rara-reply-avatar bgcolor-${color}`}>
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
              className={`rara-reply-meta-nickname color-${color} underline`}
              rel="noreferrer noopener"
            >
              {reply.nickname}
            </a>
          ) : (
            <span className={`rara-reply-meta-nickname color-${color}`}>
              {reply.nickname}
            </span>
          )}
        </div>
        <div className="rara-reply-content">
          <Markdown sanitize={true}>{reply.content}</Markdown>
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
        {open && (
          <ReplyForm replyTo={reply.id} onClose={() => setOpen(false)} />
        )}
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
  const majorReplies = replies.filter((reply) => reply.replyTo === null);

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
