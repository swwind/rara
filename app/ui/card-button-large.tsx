import { Link, LinksFunction } from "remix";

import style from "~/styles/ui/card-button-large.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

type Props = {
  href: string;
  children: string;
};

export default function CardButtonLarge({ href, children }: Props) {
  if (href.startsWith("/")) {
    return (
      <Link className="card-button-large" to={href} title={children}>
        {children}
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        className="card-button-large"
        target="_blank"
        title={children}
      >
        {children}
      </a>
    );
  }
}
