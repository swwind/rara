import { Link, LinksFunction } from "remix";

import style from "~/styles/components/post-header.css";

import Time from "~/ui/time";
import type { PostBriefData } from "./post-list";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

type Props = {
  post: PostBriefData;
};

export default function PostHeader({ post }: Props) {
  return (
    <header
      className={post.banner ? "post-header banner" : "post-header"}
      style={{
        backgroundImage: post.banner ? `url(${post.banner})` : undefined,
      }}
    >
      {post.banner && <div className="post-header__placeholder" />}
      <h1 className="post-header__title">
        <Link to={`/post/${post.url}`}>{post.title}</Link>
      </h1>
      <ul className="post-header__meta">
        <li>
          <Time time={post.createdAt} />
        </li>
        <li>
          <Link to={`/category/${post.category}`}>
            <span className="category">{post.category}</span>
          </Link>
        </li>
        {post.tags.map((tag) => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>
              <span className="tag">{tag}</span>
            </Link>
          </li>
        ))}
        <li>
          <span className="view">{post.views}</span>
        </li>
      </ul>
    </header>
  );
}
