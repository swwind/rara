import { Link } from "remix";
import Card from "../ui/Card";

import metadata from "~/metadata.json";
import Space from "../ui/Space";

export default function Author() {
  const { avatar, title, subtitle } = metadata;

  return (
    <Card>
      <div className="rara-author">
        <Link to="/" className="rara-author-avatar">
          <img src={avatar} alt="avatar" />
        </Link>
        <Space direction="vertical" gap={10} className="rara-author-meta">
          <Link to="/" className="rara-author-meta-title">
            {title}
          </Link>
          <div className="rara-author-meta-subtitle">{subtitle}</div>
        </Space>
      </div>
    </Card>
  );
}
