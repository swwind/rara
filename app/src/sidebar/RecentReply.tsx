import { Post, Reply } from "@prisma/client";
import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

export type RecentReplyData = Pick<Reply, "nickname" | "id"> & {
  post: Pick<Post, "url" | "title">;
};

type Props = {
  replies: RecentReplyData[];
};

export default function RecentReply({ replies }: Props) {
  return (
    <Card header={<CardTitle title="💬 Recent Replies" />}>
      <Space direction="vertical">
        {replies.map((reply) => (
          <CardButton
            href={`/post/${reply.post.url}#${reply.id}`}
            children={`${reply.nickname || "Anonymous"} replied at [${
              reply.post.title
            }]`}
            key={reply.id}
            size="large"
          />
        ))}
      </Space>
    </Card>
  );
}
