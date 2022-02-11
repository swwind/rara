import { Post } from "@prisma/client";
import { json, LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import NotFound, { links as notFoundLinks } from "~/components/not-found";

export const links: LinksFunction = () => [...notFoundLinks()];

type LoaderData = Post | null;

export const loader: LoaderFunction = async ({ params }) => {
  const { post } = params;

  const result = await db.post.findUnique({
    where: {
      url: post,
    },
  });

  if (result) return json(result);
  else return json(null, { status: 404 });
};

export default function PostView() {
  const post = useLoaderData<LoaderData>();

  if (!post) {
    return <NotFound />;
  }

  return (
    <div>
      <div>title: {post.title}</div>
      <div>content: {post.content}</div>
    </div>
  );
}
