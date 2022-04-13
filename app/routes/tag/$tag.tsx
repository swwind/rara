import { LoaderFunction, MetaFunction, useLoaderData, useParams } from "remix";
import PostList from "~/src/PostList";
import { TextTagColon } from "~/src/Text";
import Space from "~/src/ui/Space";
import Title from "~/src/ui/Title";
import { getPostList, PostBriefDataWithDescription } from "~/utils/posts";
import { parsePage } from "~/utils/utils";

import metadata from "~/metadata.json";

type LoaderData = {
  posts: PostBriefDataWithDescription[];
  total: number;
};

export const meta: MetaFunction<LoaderData> = ({ params }) => ({
  title: `Tag: ${params.tag} - ${metadata.title}`,
  description: metadata.description,
  keywords: [...metadata.keywords, params.tag].join(", "),

  "og:url": `${metadata.origin}/tag/${params.tag}`,
  "og:title": `Tag: ${params.tag} - ${metadata.title}`,
  "og:description": metadata.description,
});

export const loader: LoaderFunction<LoaderData> = async ({
  request,
  params,
}) => {
  const tag = params.tag!;
  const searchParams = new URL(request.url).searchParams;
  const page = parsePage(searchParams.get("p"));

  const { posts, total } = await getPostList(
    {
      tags: {
        has: tag,
      },
      hidden: false,
    },
    page
  );

  return { posts, total };
};

export default function CategoryPosts() {
  const { posts, total } = useLoaderData<LoaderData>();
  const { tag } = useParams();

  return (
    <Space direction="vertical" gap={20}>
      <Title title={<TextTagColon suffix={tag} />} />
      <PostList posts={posts} total={total} />
    </Space>
  );
}

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
