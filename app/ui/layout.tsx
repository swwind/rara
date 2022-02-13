import { LinksFunction } from "remix";
import style from "~/styles/ui/layout.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

type Props = {
  sidebar: JSX.Element;
  children: JSX.Element;
};

export default function Layout({ children, sidebar }: Props) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
      <div className="layout__left">{sidebar}</div>
    </div>
  );
}
