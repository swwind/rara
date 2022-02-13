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

type Props = {
  categories: string[];
};

export default function CategoryList({ categories }: Props) {
  return (
    <Card header={<CardTitle title="📁 Categories" />}>
      <div style={{ margin: "20px 0" }}>
        {categories.map((category) => (
          <CardButtonLarge href={`/category/${category}`} key={category}>
            {category}
          </CardButtonLarge>
        ))}
      </div>
    </Card>
  );
}
