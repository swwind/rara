import { Post } from "@prisma/client";

import Card from "~/src/ui/Card";
import PostContent from "~/src/PostContent";
import PostHeader from "~/src/PostHeader";
import Space from "./ui/Space";

export type PostBriefData = Pick<
  Post,
  | "url"
  | "banner"
  | "views"
  | "category"
  | "tags"
  | "createdAt"
  | "title"
  | "pin"
> & {
  description: string;
};

type Props = {
  posts: PostBriefData[];
};

export default function PostList({ posts }: Props) {
  return (
    <Space direction="vertical" gap={20}>
      {posts.map((post) => (
        <Card header={<PostHeader post={post} />} key={post.url}>
          <PostContent children={post.description} />
        </Card>
      ))}
    </Space>
  );
}
