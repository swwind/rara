import { Post } from "@prisma/client";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import PostHeader from "~/src/PostHeader";
import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";

import metadata from "~/metadata.json";
import PostReply, { PostReplyData } from "~/src/PostReply";
import Space from "~/src/ui/Space";

type LoaderData = {
  post: Pick<
    Post,
    | "slot"
    | "banner"
    | "content"
    | "views"
    | "category"
    | "tags"
    | "createdAt"
    | "title"
    | "pin"
  > & {
    replies: PostReplyData[];
  };
};

export const meta: MetaFunction<LoaderData> = ({ data }) => {
  const index = data?.post.content.indexOf("<!-- more -->");
  const description =
    typeof index === "number" && index > -1
      ? data?.post.content.slice(0, index)
      : data?.post.content;

  return {
    title: data?.post.title,
    description,

    "og:url": metadata.origin + "/post/" + data?.post.slot,
    "og:title": data?.post.title,
    "og:description": description,
  };
};

export const loader: LoaderFunction<LoaderData> = async ({ params }) => {
  const { slot } = params;

  const post = await db.post.findUnique({
    where: { slot },
    select: {
      slot: true,
      banner: true,
      content: true,
      views: true,
      category: true,
      tags: true,
      createdAt: true,
      title: true,
      pin: true,
      replies: {
        select: {
          nickname: true,
          email: true,
          homepage: true,
          createdAt: true,
          content: true,
          id: true,
          replyToId: true,
        },
      },
    },
  });

  if (!post) {
    throw new Response("Post was not found", { status: 404 });
  }

  return { post };
};

export default function PostView() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <Space direction="vertical" gap={20}>
      <Card header={<PostHeader post={post} />}>
        <PostContent children={post.content} />
      </Card>
      <PostReply replies={post.replies} />
    </Space>
  );
}
