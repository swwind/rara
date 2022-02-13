import { LinksFunction } from "remix";

import Card, { links as cardLinks } from "~/ui/card";
import CardButtonLarge, {
  links as cardButtonLargeLinks,
} from "~/ui/card-button-large";
import CardTitle, { links as cardTitleLinks } from "~/ui/card-title";

import metadata from "~/metadata.json";

export const links: LinksFunction = () => [
  ...cardLinks(),
  ...cardButtonLargeLinks(),
  ...cardTitleLinks(),
];

export default function FriendLinks() {
  const { friends } = metadata;

  return (
    <Card header={<CardTitle title="🔗 Friend Links" />}>
      <div style={{ margin: "20px 0" }}>
        {friends.map(({ link, name }) => (
          <CardButtonLarge href={link} key={name}>
            {name}
          </CardButtonLarge>
        ))}
      </div>
    </Card>
  );
}
