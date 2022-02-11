import { LinksFunction } from "remix";
import Author, { links as authorLinks } from "~/components/sidebar/author";
import Loading, { links as loadingLinks } from "./loading";
import style from "~/styles/ui/layout.css";

export const links: LinksFunction = () => [
  ...authorLinks(),
  ...loadingLinks(),
  {
    rel: "stylesheet",
    href: style,
  },
];

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
      <div className="layout__left">
        <Author />
        <Author />
        <Loading />
      </div>
    </div>
  );
}
