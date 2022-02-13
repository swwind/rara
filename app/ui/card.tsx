import { LinksFunction } from "remix";
import style from "~/styles/ui/card.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

type Props = {
  header?: JSX.Element;
  children: JSX.Element | JSX.Element[];
};

export default function Card({ header, children }: Props) {
  return (
    <div className="card">
      {header}
      <div className="card__content">{children}</div>
    </div>
  );
}
