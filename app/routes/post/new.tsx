import { ActionFunction, Form, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const url = form.get("url");
  const title = form.get("title");
  const content = form.get("content");

  if (
    typeof url !== "string" ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    throw 233;
  }

  await db.post.create({ data: { url, title, content, category: "Default" } });

  return redirect(`/post/${url}`);
};

export default function PostNew() {
  return (
    <Form method="post">
      <label>
        <span>URL</span>
        <input type="text" name="url" />
      </label>
      <label>
        <span>Title</span>
        <input type="text" name="title" />
      </label>
      <label>
        <span>Content</span>
        <input type="text" name="content" />
      </label>
      <input type="submit" />
    </Form>
  );
}
