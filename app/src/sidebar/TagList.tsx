import { TextTags } from "../Text";
import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

type Props = {
  tags: string[];
};

export default function TagList({ tags }: Props) {
  return (
    <Card
      header={<CardTitle title={<TextTags prefix="🏷️ " color="orange" />} />}
    >
      <Space direction="horizontal" style={{ flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <CardButton href={`/tag/${tag}`} key={tag} size="small" nav={true}>
            {`#${tag}`}
          </CardButton>
        ))}
      </Space>
    </Card>
  );
}
