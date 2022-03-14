import { Post, Reply } from "@prisma/client";

import { LinksFunction } from "remix";

import Card, { links as cardLinks } from "~/ui/card";
import CardButtonLarge, {
  links as cardButtonLargeLinks,
} from "~/ui/card-button-large";
import CardTitle, { links as cardTitleLinks } from "~/ui/card-title";

export const links: LinksFunction = () => [
  ...cardLinks(),
  ...cardButtonLargeLinks(),
  ...cardTitleLinks(),
];

export type RecentReplyData = Pick<Reply, "nickname" | "id"> & {
  post: Pick<Post, "url" | "title">;
};

type Props = {
  replies: RecentReplyData[];
};

export default function RecentReply({ replies }: Props) {
  return (
    <Card header={<CardTitle title="💬 Recent Replies" />}>
      <div style={{ margin: "20px 0" }}>
        {replies.map((reply) => (
          <CardButtonLarge
            href={`/post/${reply.post.url}#${reply.id}`}
            children={`${reply.nickname || "Anonymous"} replied at [${
              reply.post.title
            }]`}
            key={reply.id}
          />
        ))}
      </div>
    </Card>
  );
}
