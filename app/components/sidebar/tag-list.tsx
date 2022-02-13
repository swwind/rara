import { LinksFunction } from "remix";

import Card, { links as cardLinks } from "~/ui/card";
import CardButtonSmall, {
  links as cardButtonSmallLinks,
} from "~/ui/card-button-small";
import CardTitle, { links as cardTitleLinks } from "~/ui/card-title";

export const links: LinksFunction = () => [
  ...cardLinks(),
  ...cardButtonSmallLinks(),
  ...cardTitleLinks(),
];

type Props = {
  tags: string[];
};

export default function TagList({ tags }: Props) {
  return (
    <Card header={<CardTitle title="🏷️ Tags" />}>
      <div style={{ margin: "20px 0" }}>
        {tags.map((tag) => (
          <CardButtonSmall href={`/tag/${tag}`} key={tag}>
            {tag}
          </CardButtonSmall>
        ))}
      </div>
    </Card>
  );
}
