import { Link, NavLink } from "remix";

type Props = {
  href: string;
  children: string;
  size: "large" | "small";
  nav?: boolean;
};

export default function CardButton({ href, children, size, nav }: Props) {
  if (href.startsWith("/")) {
    const MyLink = nav ? NavLink : Link;

    return (
      <MyLink className={`rara-card-button ${size}`} to={href} title={children}>
        {children}
      </MyLink>
    );
  } else {
    return (
      <a
        href={href}
        className={`rara-card-button ${size}`}
        target="_blank"
        rel="noopener noreferrer"
        title={children}
      >
        {children}
      </a>
    );
  }
}
