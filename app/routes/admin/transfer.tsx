import { json, LoaderFunction, redirect, useLoaderData } from "remix";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const posts = await db.post.findMany({});
  const replies = await db.reply.findMany({});
  const files = await db.file.findMany({});

  return json({ posts, replies, files });
};

export default function Transfer() {
  const loader = useLoaderData();

  return (
    <pre>
      <code>{JSON.stringify(loader, null, 2)}</code>
    </pre>
  );
}
