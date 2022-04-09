import { Link } from "remix";
import Time from "~/src/ui/Time";
import { PostBriefData } from "~/utils/posts";
import Space from "./ui/Space";

type Props = {
  post: PostBriefData;
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
        <Link to={`/post/${post.slot}`}>{post.title}</Link>
      </h2>
      <Space direction="horizontal" gap={10} className="rara-post-header-meta">
        <Time time={post.createdAt} />
        <Link
          to={`/category/${post.category}`}
          className="rara-post-header-meta-link"
        >
          %{post.category}
        </Link>
        {post.tags.map((tag) => (
          <Link
            to={`/tag/${tag}`}
            className="rara-post-header-meta-link"
            key={tag}
          >
            #{tag}
          </Link>
        ))}
        <span>📖 {post.views}</span>
        {post.pin > 0 && <span>📌</span>}
      </Space>
    </header>
  );
}
