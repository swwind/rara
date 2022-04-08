import { Link } from "remix";
import Time from "~/src/ui/Time";
import { PostBriefData } from "./PostList";
import Space from "./ui/Space";

type Props = {
  post: Omit<PostBriefData, "description">;
};

export default function PostHeader({ post }: Props) {
  return (
    <header
      className={`rara-post-header ${
        post.banner ? "rara-post-header-banner" : ""
      }`}
      style={{
        backgroundImage: post.banner ? `url(${post.banner})` : undefined,
      }}
    >
      {post.banner && <div className="rara-post-header-placeholder" />}
      <h2 className="rara-post-header-title">
        <Link to={`/post/${post.url}`}>{post.title}</Link>
      </h2>
      <Space direction="horizontal" gap={10}>
        <Time time={post.createdAt} />
        <Link
          to={`/category/${post.category}`}
          style={{ textDecoration: "underline" }}
        >
          📁 {post.category}
        </Link>
        {post.tags.map((tag) => (
          <Link
            to={`/tag/${tag}`}
            style={{ textDecoration: "underline" }}
            key={tag}
          >
            🏷️ {tag}
          </Link>
        ))}
        <span>📖 {post.views}</span>
        {post.pin > 0 && <span>📌</span>}
      </Space>
    </header>
  );
}
