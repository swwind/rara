import { ActionFunction, Form, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const slot = form.get("slot");
  const title = form.get("title");
  const content = form.get("content");

  if (
    typeof slot !== "string" ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    throw new Response("Invalid form data", { status: 400 });
  }

  await db.post.create({ data: { slot, title, content, category: "Default" } });

  return redirect(`/post/${slot}`);
};

export default function PostNew() {
  return (
    <Form method="post">
      <label>
        <span>URL</span>
        <input type="text" name="slot" />
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
