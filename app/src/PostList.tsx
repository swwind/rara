import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";
import PostHeader from "~/src/PostHeader";
import Space from "./ui/Space";
import Paginator from "./ui/Paginator";
import { PostBriefDataWithDescription } from "~/utils/posts";

import metadata from "~/metadata.json";
import { Link } from "remix";
import { TextContinue, TextErrorHappens, TextNoPosts } from "./Text";
import CardTitle from "./ui/CardTitle";

type Props = {
  posts: PostBriefDataWithDescription[];
  total: number;
};

export default function PostList({ posts, total }: Props) {
  return posts.length ? (
    <Space direction="vertical" gap={20}>
      {posts.map((post) => (
        <Card header={<PostHeader post={post} />} key={post.slot}>
          <PostContent children={post.description} />
          <Link to={`/post/${post.slot}`} className="color-blue underline">
            <TextContinue />
          </Link>
        </Card>
      ))}
      <Paginator total={Math.floor((total - 1) / metadata.post_per_page) + 1} />
    </Space>
  ) : (
    <Card header={<CardTitle title={<TextErrorHappens />} />}>
      <div style={{ color: "var(--fg-color-2)" }}>
        <TextNoPosts />
      </div>
    </Card>
  );
}
