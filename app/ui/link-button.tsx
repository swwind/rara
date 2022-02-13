import { LinksFunction } from "remix";

import style from "~/styles/ui/link-button.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

type Props = {
  children: string;
  onClick: () => void;
};

export default function LinkButton({ children, onClick }: Props) {
  return (
    <span className="link-button" onClick={onClick}>
      {children}
    </span>
  );
}
