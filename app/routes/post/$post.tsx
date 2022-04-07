import { Post } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import PostHeader from "~/src/PostHeader";
import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";

type LoaderData = {
  post: Pick<
    Post,
    | "url"
    | "banner"
    | "content"
    | "views"
    | "category"
    | "tags"
    | "createdAt"
    | "title"
    | "pin"
  >;
};

export const loader: LoaderFunction<LoaderData> = async ({ params }) => {
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
    throw new Response("Post was not found", { status: 404 });
  }

  return {
    post: result,
  };
};

export default function PostView() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <div className="post-view">
      <Card header={<PostHeader post={post} />}>
        <PostContent children={post.content} />
      </Card>
    </div>
  );
}
