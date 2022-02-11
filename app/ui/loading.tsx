import { LinksFunction } from "remix";
import style from "~/styles/ui/loading.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function Loading() {
  const array = [...Array(5).keys()];

  return (
    <div className="loading">
      {array.map((value) => (
        <span
          key={value}
          className="loading__circle"
          style={{
            animationDelay: `.${value}s`,
          }}
        />
      ))}
    </div>
  );
}
