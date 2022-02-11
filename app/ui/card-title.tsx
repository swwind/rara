import { LinksFunction } from "remix";
import style from "~/styles/ui/card-title.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

type Props = {
  title: string;
};

export default function CardTitle({ title }: Props) {
  return (
    <header className="card-title">
      <h3>{title}</h3>
    </header>
  );
}
