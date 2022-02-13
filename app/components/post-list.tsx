import { Post } from "@prisma/client";
import { LinksFunction } from "remix";

import Card, { links as cardLinks } from "~/ui/card";
import PostContent from "~/components/post-content";
import PostHeader, { links as postHeaderLinks } from "~/components/post-header";

export const links: LinksFunction = () => [
  ...cardLinks(),
  ...postHeaderLinks(),
];

export type PostBriefData = Pick<
  Post,
  | "url"
  | "banner"
  | "content"
  | "views"
  | "category"
  | "tags"
  | "createdAt"
  | "title"
  | "pin"
>;

type Props = {
  posts: PostBriefData[];
};

export default function PostList({ posts }: Props) {
  const getDescription = (content: string) => {
    const index = content.indexOf("<!-- more -->");
    return index === -1 ? content : content.substring(0, index);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Card header={<PostHeader post={post} />} key={post.url}>
          <PostContent children={getDescription(post.content)} />
        </Card>
      ))}
    </div>
  );
}
