import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";
import PostHeader from "~/src/PostHeader";
import Space from "./ui/Space";
import Paginator from "./ui/Paginator";
import { PostBriefDataWithDescription } from "~/utils/posts";

import metadata from "~/metadata.json";

type Props = {
  posts: PostBriefDataWithDescription[];
  total: number;
};

export default function PostList({ posts, total }: Props) {
  return (
    <Space direction="vertical" gap={20}>
      {posts.map((post) => (
        <Card header={<PostHeader post={post} />} key={post.slot}>
          <PostContent children={post.description} />
        </Card>
      ))}
      <Paginator total={Math.floor((total - 1) / metadata.post_per_page) + 1} />
    </Space>
  );
}
