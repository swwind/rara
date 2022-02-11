import { LinksFunction } from "remix";

import Card, { links as cardLinks } from "~/ui/card";
import CardTitle, { links as cardTitleLinks } from "~/ui/card-title";

import style from "~/styles/components/not-found.css";

export const links: LinksFunction = () => [
  ...cardLinks(),
  ...cardTitleLinks(),
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function NotFound() {
  return (
    <Card header={<CardTitle title="$not_found" />}>
      <p className="not-found__large">😅</p>
    </Card>
  );
}
