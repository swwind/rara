import { Post } from "@prisma/client";
import { json, LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

import NotFound, { links as notFoundLinks } from "~/components/not-found";
import PostHeader, { links as postHeaderLinks } from "~/components/post-header";
import Card, { links as cardLinks } from "~/ui/card";

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
    <div className="post-view">
      <Card header={<PostHeader post={post} />}>
        <div>{post.title}</div>
      </Card>
    </div>
  );
}
