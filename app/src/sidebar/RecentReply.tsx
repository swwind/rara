import { Post, Reply } from "@prisma/client";
import { TextRecentReplies } from "../Text";
import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

export type RecentReplyData = Pick<Reply, "nickname" | "id"> & {
  post: Pick<Post, "slot" | "title">;
};

type Props = {
  replies: RecentReplyData[];
};

export default function RecentReply({ replies }: Props) {
  return (
    <Card header={<CardTitle title={<TextRecentReplies prefix="💬 " />} />}>
      <Space direction="vertical">
        {replies.map((reply) => (
          <CardButton
            href={`/post/${reply.post.slot}#${reply.id}`}
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
