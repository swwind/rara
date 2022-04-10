import { Post } from "@prisma/client";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { db } from "~/utils/db.server";

import PostHeader from "~/src/PostHeader";
import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";

import metadata from "~/metadata.json";
import PostReply, { PostReplyData } from "~/src/PostReply";
import Space from "~/src/ui/Space";
import { invariantString } from "~/utils/utils";

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

  const post = await db.post.update({
    where: { slot },
    data: {
      views: {
        increment: 1,
      },
    },
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
          github: true,
          qq: true,
          homepage: true,
          createdAt: true,
          content: true,
          id: true,
          replyTo: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!post) {
    throw new Response("Post was not found", { status: 404 });
  }

  return { post };
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const { slot } = params;

  const nickname = invariantString(form.get("nickname") || "Anonymous");
  const homepage = invariantString(form.get("homepage"));
  const email = invariantString(form.get("email") ?? "");
  const github = invariantString(form.get("github") ?? "");
  const qq = invariantString(form.get("qq") ?? "");
  const content = invariantString(form.get("content"));
  const _replyTo = invariantString(form.get("replyTo"));
  const replyTo = /^\d+$/.test(_replyTo) ? parseInt(_replyTo) : null;

  if (!content) {
    throw new Response("Content is required", { status: 400 });
  }

  await db.reply.create({
    data: {
      nickname,
      homepage,
      email,
      github,
      qq,
      content,
      post: { connect: { slot } },
      replyTo,
    },
  });

  return null;
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