import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import PostList from "~/src/PostList";
import { getPostList, PostBriefDataWithDescription } from "~/utils/posts";
import { parsePage } from "~/utils/utils";
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
  posts: PostBriefDataWithDescription[];
  total: number;
};

export const loader: LoaderFunction<LoaderData> = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const page = parsePage(searchParams.get("p"));

  const { posts, total } = await getPostList({}, page);

  if (!posts.length) {
    throw new Response("Posts were not found", { status: 404 });
  }

  return { posts, total };
};

export default function Index() {
  const { posts, total } = useLoaderData<LoaderData>();

  return <PostList posts={posts} total={total} />;
}
