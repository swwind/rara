import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

type Props = {
  tags: string[];
};

export default function TagList({ tags }: Props) {
  return (
    <Card header={<CardTitle title="🏷️ Tags" />}>
      <Space direction="horizontal">
        {tags.map((tag) => (
          <CardButton href={`/tag/${tag}`} key={tag} size="small" nav={true}>
            {`#${tag}`}
          </CardButton>
        ))}
      </Space>
    </Card>
  );
}
