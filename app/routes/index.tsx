import {
  json,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { Post } from "@prisma/client";

import NotFound, { links as notFoundLinks } from "~/components/not-found";
import PostList, {
  links as postListLinks,
  PostBriefData,
} from "~/components/post-list";

import { db } from "~/utils/db.server";
import metadata from "~/metadata.json";
import { renderMarkdown } from "~/utils/markdown";

export const links: LinksFunction = () => [
  ...notFoundLinks(),
  ...postListLinks(),
];

export const meta: MetaFunction = () => {
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords.join(", "),

    "og:url": metadata.origin + "/",
    "og:title": metadata.title,
    "og:description": metadata.description,
  };
};

type LoaderData = PostBriefData[] | null;

export const loader: LoaderFunction = async () => {
  const array = await db.post.findMany({
    take: metadata.post_per_page,
    skip: 0,
    orderBy: [{ pin: "desc" }, { createdAt: "desc" }],
    select: {
      url: true,
      banner: true,
      content: true,
      views: true,
      category: true,
      tags: true,
      createdAt: true,
      title: true,
      pin: true,
    },
  });

  if (!array.length) {
    return json(null, { status: 404 });
  }

  return json(
    array.map((post) => {
      const index = post.content.indexOf("<!-- more -->");
      const description =
        index === -1 ? post.content : post.content.substring(0, index);
      const rendered = renderMarkdown(description);
      return {
        ...post,
        content: rendered,
      };
    })
  );
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  if (!data) {
    return <NotFound />;
  }

  return <PostList posts={data} />;
}
