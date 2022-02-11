import { Link, LinksFunction } from "remix";
import Card, { links as cardLinks } from "~/ui/card";

import style from "~/styles/components/sidebar/author.css";

import metadata from "~/metadata.json";

export const links: LinksFunction = () => [
  ...cardLinks(),
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function Author() {
  const { avatar, title, subtitle } = metadata;

  return (
    <Card>
      <div className="author">
        <div className="author__avatar">
          <Link to="/">
            <img src={avatar} alt="avatar" />
          </Link>
        </div>
        <div className="author__title">
          <Link to="/">{title}</Link>
        </div>
        <div className="author__subtitle">{subtitle}</div>
      </div>
    </Card>
  );
}
