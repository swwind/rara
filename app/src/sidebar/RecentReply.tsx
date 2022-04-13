import { Post, Reply } from "@prisma/client";
import { TextRecentReplies, TextRepliedAt } from "../Text";
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
    <Card
      header={
        <CardTitle title={<TextRecentReplies prefix="💬 " color="pink" />} />
      }
    >
      <Space direction="vertical">
        {replies.map((reply) => (
          <CardButton
            href={`/post/${reply.post.slot}#reply-${reply.id}`}
            key={reply.id}
            size="large"
          >
            <TextRepliedAt author={reply.nickname} title={reply.post.title} />
          </CardButton>
        ))}
      </Space>
    </Card>
  );
}
