import { LoaderFunction, useLoaderData, useParams } from "remix";
import PostList from "~/src/PostList";
import { TextCategoryColon } from "~/src/Text";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";
import { getPostList, PostBriefDataWithDescription } from "~/utils/posts";
import { parsePage } from "~/utils/utils";

type LoaderData = {
  posts: PostBriefDataWithDescription[];
  total: number;
};

export const loader: LoaderFunction<LoaderData> = async ({
  request,
  params,
}) => {
  const { category } = params;
  const searchParams = new URL(request.url).searchParams;
  const page = parsePage(searchParams.get("p"));

  const { posts, total } = await getPostList(
    {
      category: category,
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
  const { category } = useParams();

  return (
    <Space direction="vertical" gap={20}>
      <Title title={<TextCategoryColon suffix={category} />} />
      <PostList posts={posts} total={total} />
    </Space>
  );
}
