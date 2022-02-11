import { LinksFunction } from "remix";
import metadata from "~/metadata.json";

import style from "~/styles/components/footer.css";
import rokishi from "~/img/rokishi.webp";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "preload", href: rokishi, as: "image", type: "image/webp" },
];

export default function Footer() {
  const { footer } = metadata;

  return (
    <footer>
      <div className="content" style={{ backgroundImage: `url("${rokishi}")` }}>
        <div className="text">
          <div className="lang">
            <span>🌎</span>
            <span className="select now">Chinese</span>
            <span className="select">English</span>
            <span className="select">Japanese</span>
          </div>
          <div className="copyright">
            {footer.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
