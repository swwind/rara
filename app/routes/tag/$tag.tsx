import { LoaderFunction, useLoaderData, useParams } from "remix";
import PostList from "~/src/PostList";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";
import { getPostBriefDataList, PostBriefData } from "~/utils/posts";
import { parsePage } from "~/utils/utils";

type LoaderData = {
  posts: PostBriefData[];
  total: number;
};

export const loader: LoaderFunction<LoaderData> = async ({
  request,
  params,
}) => {
  const { tag } = params;
  const searchParams = new URL(request.url).searchParams;
  const page = parsePage(searchParams.get("p"));

  const { posts, total } = await getPostBriefDataList(
    {
      tags: {
        has: tag,
      },
    },
    page
  );

  if (!posts.length) {
    throw new Response("Posts were not found", { status: 404 });
  }

  return { posts, total };
};

export default function CategoryPosts() {
  const { posts, total } = useLoaderData<LoaderData>();
  const { tag } = useParams();

  return (
    <Space direction="vertical" gap={20}>
      <Title title={`标签：${tag}`}></Title>
      <PostList posts={posts} total={total} />
    </Space>
  );
}
