import { Link, LoaderFunction, redirect } from "remix";
import { TextDashboard } from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import TextButton from "~/src/ui/TextButton";
import { authenticate } from "~/utils/authenticate";

export const loader: LoaderFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  return null;
};

export default function DashBoard() {
  return (
    <Card header={<CardTitle title={<TextDashboard />} />}>
      <div>
        <Link to="/admin/post">
          <TextButton>Manage Posts</TextButton>
        </Link>
      </div>
      <div>
        <Link to="/admin/reply">
          <TextButton>Manage Replies</TextButton>
        </Link>
      </div>
    </Card>
  );
}
