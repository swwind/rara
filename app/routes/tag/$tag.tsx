import { LoaderFunction, useLoaderData, useParams } from "remix";
import PostList, { PostBriefData } from "~/src/PostList";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";
import { db } from "~/utils/db.server";

type LoaderData = {
  posts: PostBriefData[];
};

export const loader: LoaderFunction<LoaderData> = async ({ params }) => {
  const { tag } = params;

  const posts = await db.post.findMany({
    where: {
      tags: {
        has: tag!,
      },
    },
    orderBy: {
      createdAt: "desc",
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

  if (!posts.length) {
    throw new Response("No posts found", { status: 404 });
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

export default function CategoryPosts() {
  const { posts } = useLoaderData<LoaderData>();
  const { tag } = useParams();

  return (
    <Space direction="vertical" gap={20}>
      <Title title={`标签：${tag}`}></Title>
      <PostList posts={posts} />
    </Space>
  );
}
