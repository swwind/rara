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
import PostList, { links as postListLinks } from "~/components/post-list";

import { db } from "~/utils/db.server";
import metadata from "~/metadata.json";

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

type LoaderData = Post[] | null;

export const loader: LoaderFunction = async ({ params }) => {
  const array = await db.post.findMany({
    take: metadata.post_per_page,
    skip: 0,
    orderBy: [{ pin: "desc" }, { createdAt: "desc" }],
  });

  if (!array.length) {
    return json(null, { status: 404 });
  }

  return json(array);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  if (!data) {
    return <NotFound />;
  }

  return <PostList posts={data} />;
}
