import { Link } from "remix";
import Card from "../ui/Card";

import metadata from "~/metadata.json";

export default function Author() {
  const { avatar, title, subtitle } = metadata;

  return (
    <Card>
      <div className="rara-author">
        <Link to="/" className="rara-author-avatar">
          <img src={avatar} alt="avatar" />
        </Link>
        <Link to="/" className="rara-author-title">
          {title}
        </Link>
        <div className="rara-author-subtitle">{subtitle}</div>
      </div>
    </Card>
  );
}
