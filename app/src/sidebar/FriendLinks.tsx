import metadata from "~/metadata.json";
import { TextFriendLinks } from "../Text";
import Card from "../ui/Card";
import CardButton from "../ui/CardButton";
import CardTitle from "../ui/CardTitle";
import Space from "../ui/Space";

export default function FriendLinks() {
  const { friends } = metadata;

  return (
    <Card
      header={
        <CardTitle title={<TextFriendLinks prefix="🔗 " color="teal" />} />
      }
    >
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
