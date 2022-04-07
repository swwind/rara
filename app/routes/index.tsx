import { LoaderFunction, MetaFunction, useLoaderData } from "remix";

import PostList, { PostBriefData } from "~/src/PostList";

import { db } from "~/utils/db.server";
import metadata from "~/metadata.json";

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

type LoaderData = {
  posts: PostBriefData[];
};

export const loader: LoaderFunction<LoaderData> = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  // FIXME:
  const page = parseInt(searchParams.get("p") || "1");

  const posts = await db.post.findMany({
    take: metadata.post_per_page,
    skip: (page - 1) * metadata.post_per_page,
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

  if (!posts.length) {
    throw new Response("Posts were not found", { status: 404 });
  }

  return {
    posts: posts.map((post) => {
      const index = post.content.indexOf("<!-- more -->");
      const description =
        index === -1 ? post.content : post.content.substring(0, index);

      return {
        ...post,
        description,
      };
    }),
  };
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();

  return <PostList posts={posts} />;
}
