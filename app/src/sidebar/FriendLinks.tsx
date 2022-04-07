import metadata from "~/metadata.json";
import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

export default function FriendLinks() {
  const { friends } = metadata;

  return (
    <Card header={<CardTitle title="🔗 Friend Links" />}>
      <Space direction="vertical">
        {friends.map(({ link, name }) => (
          <CardButton href={link} key={name} size="large">
            {name}
          </CardButton>
        ))}
      </Space>
    </Card>
  );
}
