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
  en: "Categories",
  "zh-CN": "分类",
  "ja-JP": "カテゴリー",
});

export const TextCategoryColon = createComponent({
  en: "Category: ",
  "zh-CN": "分类：",
  "ja-JP": "カテゴリー：",
});

export const TextTags = createComponent({
  en: "Tags",
  "zh-CN": "标签",
  "ja-JP": "タグ",
});

export const TextTagColon = createComponent({
  en: "Tag: ",
  "zh-CN": "标签：",
  "ja-JP": "タグ：",
});

export const TextFriendLinks = createComponent({
  en: "Friend Links",
  "zh-CN": "友情链接",
  "ja-JP": "フレンドリンク",
});

export const TextRecentReplies = createComponent({
  en: "Recent Replies",
  "zh-CN": "最近回复",
  "ja-JP": "最近の返信",
});

export const TextReplies = createComponent({
  en: "Replies",
  "zh-CN": "回复",
  "ja-JP": "返信",
});

export const TextNoReply = createComponent({
  en: "No reply yet",
  "zh-CN": "还没有回复",
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
