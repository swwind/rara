import { useContext } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";

function createComponent(translation: Record<LanguageType, string>) {
  return function Text({
    prefix,
    suffix,
  }: {
    prefix?: string;
    suffix?: string;
  }) {
    const { language } = useContext(LanguageContext);
    return (
      <span>
        {prefix ?? ""}
        {translation[language]}
        {suffix ?? ""}
      </span>
    );
  };
}

export const TextCategories = createComponent({
  "en-US": "Categories",
  "zh-CN": "分类",
  "ja-JP": "カテゴリー",
});

export const TextCategoryColon = createComponent({
  "en-US": "Category: ",
  "zh-CN": "分类：",
  "ja-JP": "カテゴリー：",
});

export const TextTags = createComponent({
  "en-US": "Tags",
  "zh-CN": "标签",
  "ja-JP": "タグ",
});

export const TextTagColon = createComponent({
  "en-US": "Tag: ",
  "zh-CN": "标签：",
  "ja-JP": "タグ：",
});

export const TextFriendLinks = createComponent({
  "en-US": "Friend Links",
  "zh-CN": "友情链接",
  "ja-JP": "フレンドリンク",
});

export const TextRecentReplies = createComponent({
  "en-US": "Recent Replies",
  "zh-CN": "最近回复",
  "ja-JP": "最近の返信",
});

export const TextReplies = createComponent({
  "en-US": "Replies",
  "zh-CN": "回复",
  "ja-JP": "返信",
});

export const TextNoReply = createComponent({
  "en-US": "No reply yet",
  "zh-CN": "还没有回复捏",
  "ja-JP": "返信はまだありません",
});

export function TextDateTime({ time }: { time: Date }) {
  const { language } = useContext(LanguageContext);

  const date = new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(time);

  const timeFormat = new Intl.DateTimeFormat(language, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(time);

  return <span>{`${date} ${timeFormat}`}</span>;
}

export function TextRepliedAt({
  author,
  title,
}: {
  author: string;
  title: string;
}) {
  const { language } = useContext(LanguageContext);

  const translation = {
    "en-US": (
      <span title={`${author} replied at ${title}`}>
        {author} replied at <em>{title}</em>
      </span>
    ),
    "zh-CN": (
      <span title={`${author} 回复于「${title}」`}>
        {author} 回复于「{title}」
      </span>
    ),
    "ja-JP": (
      <span title={`${author} 様が「${title}」に返信しました`}>
        {author} 様が「{title}」に返信しました
      </span>
    ),
  };

  return translation[language];
}

export const TextReply = createComponent({
  "en-US": "Reply",
  "zh-CN": "回复",
  "ja-JP": "返信",
});

export const TextIAmARobot = createComponent({
  "en-US": "I am a robot",
  "zh-CN": "我是机器人",
  "ja-JP": "私はロボットです",
});

export const TextNickname = createComponent({
  "en-US": "Nickname",
  "zh-CN": "昵称",
  "ja-JP": "ニックネーム",
});

export const TextHomepage = createComponent({
  "en-US": "Homepage",
  "zh-CN": "个人主页",
  "ja-JP": "ホームページ",
});

export const TextAvatarType = createComponent({
  "en-US": "Avatar Type",
  "zh-CN": "头像类型",
  "ja-JP": "アバタータイプ",
});

export const TextContent = createComponent({
  "en-US": "Content",
  "zh-CN": "内容",
  "ja-JP": "コンテント",
});

export const TextEmail = createComponent({
  "en-US": "Email",
  "zh-CN": "电子邮箱",
  "ja-JP": "メール",
});

export const TextNewReply = createComponent({
  "en-US": "New Reply",
  "zh-CN": "新建回复",
  "ja-JP": "新規返信",
});
