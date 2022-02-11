import { Link, LinksFunction } from "remix";

import Button, { links as buttonLinks } from "~/ui/button";

export const links: LinksFunction = () => [...buttonLinks()];

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="/post/new">/post/new</Link>
        </li>
        <li>
          <Button onClick={() => alert("xss")}>
            <span>alert("xss")</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}
