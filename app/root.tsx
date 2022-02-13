import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";

import Layout, { links as layoutLinks } from "./ui/layout";
import Footer, { links as footerLinks } from "./components/footer";
import Author, { links as authorLinks } from "./components/sidebar/author";
import CategoryList, {
  links as categoryListLinks,
} from "./components/sidebar/category-list";
import TagList, { links as tagListLinks } from "./components/sidebar/tag-list";
import FriendLinks, {
  links as friendLinksLinks,
} from "./components/sidebar/friend-links";
import RecentReply, {
  links as recentReplyLinks,
  RecentReplyData,
} from "./components/sidebar/recent-reply";

import globalStyle from "./styles/global.css";
import typoStyle from "./styles/typography.css";

import { db } from "./utils/db.server";

export const links: LinksFunction = () => [
  ...layoutLinks(),
  ...footerLinks(),
  ...authorLinks(),
  ...categoryListLinks(),
  ...tagListLinks(),
  ...friendLinksLinks(),
  ...recentReplyLinks(),
  {
    rel: "stylesheet",
    href: globalStyle,
  },
  {
    rel: "stylesheet",
    href: typoStyle,
  },
];

type LoaderData = {
  categories: string[];
  tags: string[];
  replies: RecentReplyData[];
};

export const loader: LoaderFunction = async () => {
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

  const result: LoaderData = {
    categories,
    tags,
    replies,
  };

  return json(result);
};

export default function App() {
  const { categories, tags, replies } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="main">
          <Layout
            sidebar={
              <>
                <Author />
                <CategoryList categories={categories} />
                <TagList tags={tags} />
                <RecentReply replies={replies} />
                <FriendLinks />
              </>
            }
          >
            <Outlet />
          </Layout>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
