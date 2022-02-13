import { Link, LinksFunction } from "remix";

import style from "~/styles/ui/card-button-small.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

type Props = {
  href: string;
  children: string;
};

export default function CardButtonSmall({ href, children }: Props) {
  return (
    <Link className="card-button-small" to={href}>
      {children}
    </Link>
  );
}
