import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";

import Layout, { links as layoutLinks } from "./ui/layout";
import Footer, { links as footerLinks } from "./components/footer";

import globalStyle from "./styles/global.css";
import typoStyle from "./styles/typography.css";

import metadata from "./metadata.json";

export const links: LinksFunction = () => [
  ...layoutLinks(),
  ...footerLinks(),
  {
    rel: "stylesheet",
    href: globalStyle,
  },
  {
    rel: "stylesheet",
    href: typoStyle,
  },
];

export const meta: MetaFunction = () => {
  return { title: metadata.title, description: metadata.description };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="main">
          <Layout>
            <Outlet />
          </Layout>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
