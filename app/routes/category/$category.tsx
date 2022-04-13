import { LoaderFunction, MetaFunction, useLoaderData, useParams } from "remix";
import PostList from "~/src/PostList";
import { TextCategoryColon } from "~/src/Text";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";
import { getPostList, PostBriefDataWithDescription } from "~/utils/posts";
import { parsePage } from "~/utils/utils";

import metadata from "~/metadata.json";

type LoaderData = {
  posts: PostBriefDataWithDescription[];
  total: number;
};

export const meta: MetaFunction<LoaderData> = ({ data, params }) => ({
  title: `Category: ${params.category} - ${metadata.title}`,
  description: metadata.description,
  keywords: [...metadata.keywords, params.category].join(", "),

  "og:url": `${metadata.origin}/category/${params.category}`,
  "og:title": `Category: ${params.category} - ${metadata.title}`,
  "og:description": metadata.description,
});

export const loader: LoaderFunction<LoaderData> = async ({
  request,
  params,
}) => {
  const category = params.category!;
  const searchParams = new URL(request.url).searchParams;
  const page = parsePage(searchParams.get("p"));

  const { posts, total } = await getPostList(
    {
      category,
      hidden: false,
    },
    page
  );

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

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
