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
import { useState } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";
import Header from "./src/Header";

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
};

export const loader: LoaderFunction<LoaderData> = async () => {
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
            url: true,
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
  };
};

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};

function Document({ title, children }: DocumentProps) {
  const [language, setLanguage] = useState<LanguageType>("zh-CN");

  return (
    <html lang={language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {children}
        </LanguageContext.Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const { categories, tags, replies } = useLoaderData<LoaderData>();

  return (
    <Document>
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
