import { Post } from "@prisma/client";
import { json, LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import NotFound, { links as notFoundLinks } from "~/components/not-found";
import PostHeader, { links as postHeaderLinks } from "~/components/post-header";
import Card, { links as cardLinks } from "~/ui/card";
import { renderMarkdown } from "~/utils/markdown";
import PostContent from "~/components/post-content";

export const links: LinksFunction = () => [
  ...notFoundLinks(),
  ...cardLinks(),
  ...postHeaderLinks(),
];

type LoaderData = Post | null;

export const loader: LoaderFunction = async ({ params }) => {
  const { post } = params;

  const result = await db.post.findUnique({
    where: {
      url: post,
    },
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

  if (!result) {
    return json(null, { status: 404 });
  }

  return json({ ...result, content: renderMarkdown(result.content) });
};

export default function PostView() {
  const post = useLoaderData<LoaderData>();

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="post-view">
      <Card header={<PostHeader post={post} />}>
        <PostContent children={post.content} />
      </Card>
    </div>
  );
}
