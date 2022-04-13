import { Link, LoaderFunction, redirect } from "remix";
import {
  TextDashboard,
  TextManageFiles,
  TextManagePosts,
  TextManageReplies,
} from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
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
        <Link to="/admin/post" className="color-blue underline">
          <TextManagePosts />
        </Link>
      </div>
      <div>
        <Link to="/admin/reply" className="color-blue underline">
          <TextManageReplies />
        </Link>
      </div>
      <div>
        <Link to="/admin/file" className="color-blue underline">
          <TextManageFiles />
        </Link>
      </div>
    </Card>
  );
}

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
