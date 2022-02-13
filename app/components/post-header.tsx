import { Post } from "@prisma/client";
import { Link, LinksFunction, Outlet } from "remix";

import style from "~/styles/components/post-header.css";

import Time from "~/ui/time";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];

type Props = {
  post: Post;
};

export default function PostHeader({ post }: Props) {
  return (
    <div
      className={post.banner ? "post-header banner" : "post-header"}
      style={{
        backgroundImage: post.banner ? `url(${post.banner})` : undefined,
      }}
    >
      {post.banner && <div className="post-header__placeholder" />}
      <h2 className="post-header__title">
        <Link to={`/post/${post.url}`}>{post.title}</Link>
      </h2>
      <div className="post-header__meta">
        <Time time={post.createdAt} />
        <Link to={`/category/${post.category}`}>
          <span className="category">{post.category}</span>
        </Link>
        {post.tags.map((tag) => (
          <Link to={`/tag/${tag}`} key={tag}>
            <span className="tag">{tag}</span>
          </Link>
        ))}
        <span className="view">{post.views}</span>
      </div>
    </div>
  );
}
