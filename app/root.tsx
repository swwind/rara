import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";

import Layout from "~/src/ui/Layout";
import Footer from "~/src/Footer";
import Author from "~/src/sidebar/Author";
import CategoryList from "~/src/sidebar/CategoryList";
import TagList from "~/src/sidebar/TagList";
import FriendLinks from "~/src/sidebar/FriendLinks";
import RecentReply, { RecentReplyData } from "~/src/sidebar/RecentReply";

import globalStyle from "~/styles/global.css";
import rokishi from "~/img/rokishi.webp";

import { db } from "~/utils/db.server";
import Space from "~/src/ui/Space";
import { useEffect, useState } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";
import Header from "./src/Header";
import { ThemeContext, ThemeType } from "./utils/context/theme";
import {
  defaultUserInfo,
  UserInfo,
  UserInfoContext,
} from "./utils/context/userinfo";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyle,
  },
  {
    rel: "preload",
    href: rokishi,
    as: "image",
    type: "image/webp",
  },
];

type LoaderData = {
  categories: string[];
  tags: string[];
  replies: RecentReplyData[];
  theme: ThemeType;
  language: LanguageType;
};

export const loader: LoaderFunction<LoaderData> = async ({ request }) => {
  const cookie = request.headers.get("Cookie") ?? "";
  const acceptLanguage = request.headers.get("Accept-Language") ?? "";

  const theme = cookie.includes("theme=dark") ? "dark" : "light";

  let language: LanguageType = "en-US";

  const result = /\blanguage=(en-US|zh-CN|ja-JP)\b/.exec(cookie);
  if (result) {
    language = result[1] as LanguageType;
  } else {
    // find the first acceptable language
    for (const lang of acceptLanguage.split(",")) {
      if (lang.startsWith("en")) {
        language = "en-US";
        break;
      }
      if (lang.startsWith("zh")) {
        language = "zh-CN";
        break;
      }
      if (lang.startsWith("ja")) {
        language = "ja-JP";
        break;
      }
    }
    // otherwise we use the default language
  }

  const [categories, tags, replies] = await Promise.all([
    // get categories list
    db.post
      .findMany({
        distinct: ["category"],
        select: {
          category: true,
        },
      })
      .then((value) => value.map(({ category }) => category)),

    // get tags list
    db.post
      .findMany({
        distinct: ["tags"],
        select: {
          tags: true,
        },
      })
      .then((value) =>
        Array.from(new Set(value.map(({ tags }) => tags).flat()))
      ),

    // get recent replies
    db.reply.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        nickname: true,
        post: {
          select: {
            slot: true,
            title: true,
          },
        },
      },
    }),
  ]);

  return {
    categories,
    tags,
    replies,
    theme,
    language,
  };
};

type DocumentProps = {
  title?: string;
  theme?: ThemeType;
  language?: LanguageType;
  children: React.ReactNode;
};

function Document({ title, children, theme, language }: DocumentProps) {
  theme = theme ?? "light";
  language = language ?? "en-US";

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content={theme} />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body data-theme={theme}>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const {
    categories,
    tags,
    replies,
    theme: defaultTheme,
    language: defaultLanguage,
  } = useLoaderData<LoaderData>();

  const [theme, _setTheme] = useState<ThemeType>(defaultTheme);
  const [language, _setLanguage] = useState<LanguageType>(defaultLanguage);
  const [userInfo, _setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const setTheme = (theme: ThemeType) => {
    _setTheme(theme);
    document.cookie = `theme=${theme}; path=/; Expires=9999-12-31`;
  };

  const setLanguage = (language: LanguageType) => {
    _setLanguage(language);
    document.cookie = `language=${language}; path=/; Expires=9999-12-31`;
  };

  const setUserInfo = (partial: Partial<UserInfo>) => {
    const newUserInfo = { ...userInfo, ...partial };
    _setUserInfo(newUserInfo);
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  };

  useEffect(() => {
    // load user info from local storage
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      _setUserInfo(JSON.parse(userInfo));
    }

    if (
      // first time visit
      !document.cookie.includes("theme") &&
      // prefers dark color scheme
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  return (
    <Document theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            <Space direction="vertical" gap={20} style={{ minHeight: "100vh" }}>
              <Header />
              <Layout
                sidebar={
                  <Space direction="vertical" gap={20}>
                    <Author />
                    <CategoryList categories={categories} />
                    <TagList tags={tags} />
                    <RecentReply replies={replies} />
                    <FriendLinks />
                  </Space>
                }
              >
                <Outlet />
              </Layout>
              <Footer />
            </Space>
          </UserInfoContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title={`Error: ${error.message}`}>
      <div>
        <h1>Error: {error.message}</h1>
        <pre>{error.stack}</pre>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`Error: ${caught.status} ${caught.statusText}`}>
      <div>
        <h1>
          Catch: {caught.status} {caught.statusText}
        </h1>
        <pre>{caught.data}</pre>
      </div>
    </Document>
  );
}
