import { ActionFunction, Form, redirect } from "remix";
import { TextNewPost } from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";
import { invariantString } from "~/utils/utils";

export const action: ActionFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const form = await request.formData();
  const slot = invariantString(form.get("slot"));

  await db.post.create({
    data: {
      slot,
      title: "bilibili 献给新一代的演讲《后浪》",
      content: "你所热爱的，就是你的生活",
      category: "Default",
    },
  });

  return redirect(`/admin/post/edit/${slot}`);
};

export default function PostNew() {
  return (
    <Card header={<CardTitle title={<TextNewPost />} />}>
      <Form method="post">
        <label>
          <span>slot</span>
          <input type="text" name="slot" required />
        </label>
        <input type="submit" />
      </Form>
    </Card>
  );
}
