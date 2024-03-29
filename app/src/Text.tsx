import { useContext } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";

function createComponent(translation: Record<LanguageType, string>) {
  return function Text({
    prefix,
    suffix,
    color,
  }: {
    prefix?: string;
    suffix?: string;
    color?: string;
  }) {
    const { language } = useContext(LanguageContext);
    return (
      <span className={color ? `color-${color}` : ""}>
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

export const TextCaptcha = createComponent({
  "en-US": "Captcha",
  "zh-CN": "验证码",
  "ja-JP": "キャプチャ",
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

export const TextClose = createComponent({
  "en-US": "Close",
  "zh-CN": "关闭",
  "ja-JP": "閉じる",
});

export const TextContinue = createComponent({
  "en-US": "Continue »",
  "zh-CN": "继续阅读 »",
  "ja-JP": "お読み続ける »",
});

export const TextSubmit = createComponent({
  "en-US": "Submit",
  "zh-CN": "提交",
  "ja-JP": "提出",
});

export const TextAdminLogin = createComponent({
  "en-US": "Admin Login",
  "zh-CN": "管理员登录",
  "ja-JP": "管理者ログイン",
});

export const TextSecretWrong = createComponent({
  "en-US": "Wrong secret",
  "zh-CN": "密码错误",
  "ja-JP": "パスワードが間違う",
});

export const TextDashboard = createComponent({
  "en-US": "Dashboard",
  "zh-CN": "仪表盘",
  "ja-JP": "ダッシュボード",
});

export const TextAdmin = createComponent({
  "en-US": "Admin",
  "zh-CN": "管理",
  "ja-JP": "管理",
});

export const TextManagePosts = createComponent({
  "en-US": "Manage Posts",
  "zh-CN": "管理文章",
  "ja-JP": "投稿管理",
});

export const TextManageReplies = createComponent({
  "en-US": "Manage Replies",
  "zh-CN": "管理回复",
  "ja-JP": "返信管理",
});

export const TextEdit = createComponent({
  "en-US": "Edit",
  "zh-CN": "编辑",
  "ja-JP": "編集",
});

export const TextEditColon = createComponent({
  "en-US": "Edit: ",
  "zh-CN": "编辑：",
  "ja-JP": "編集：",
});

export const TextDelete = createComponent({
  "en-US": "Delete",
  "zh-CN": "删除",
  "ja-JP": "削除",
});

export const TextErrorHappens = createComponent({
  "en-US": "Something wrong...",
  "zh-CN": "出了些问题捏",
  "ja-JP": "トラブルが発生しました！",
});

export const TextNoPosts = createComponent({
  "en-US": "No posts yet (Maybe ... ?)",
  "zh-CN": "居然没有文章捏（也可能只是你看不到捏）",
  "ja-JP": "まだ投稿はありません（かもしれません）",
});

export const TextHidden = createComponent({
  "en-US": "Hidden",
  "zh-CN": "隐藏",
  "ja-JP": "隠れる",
});

export const TextNewPost = createComponent({
  "en-US": "New Post",
  "zh-CN": "新建文章",
  "ja-JP": "新規投稿",
});

export const TextManageFiles = createComponent({
  "en-US": "Manage Files",
  "zh-CN": "管理文件",
  "ja-JP": "ファイル管理",
});

export const TextUpload = createComponent({
  "en-US": "Upload",
  "zh-CN": "上传",
  "ja-JP": "アップロード",
});
