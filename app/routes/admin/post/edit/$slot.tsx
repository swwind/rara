import { Post } from "@prisma/client";
import { useEffect } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
  useTransition,
  useActionData,
  Link,
} from "remix";
import { TextDelete, TextEditColon, TextSubmit } from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import Space from "~/src/ui/Space";
import TextButton from "~/src/ui/TextButton";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";
import { invariantString } from "~/utils/utils";

type LoaderData = {
  post: Pick<
    Post,
    | "title"
    | "banner"
    | "category"
    | "tags"
    | "content"
    | "hidden"
    | "pin"
    | "slot"
  >;
};

export const loader: LoaderFunction<LoaderData> = async ({
  request,
  params,
}) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const slot = params.slot!;

  const post = await db.post.findUnique({
    where: { slot },
    select: {
      title: true,
      banner: true,
      category: true,
      tags: true,
      content: true,
      hidden: true,
      pin: true,
      slot: true,
    },
  });

  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return { post };
};

enum ActionType {
  Update = "update",
  Delete = "delete",
}

type ActionData = {
  success: true;
};

export const action: ActionFunction<ActionData> = async ({
  request,
  params,
}) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const slot = params.slot!;
  const formData = await request.formData();
  const _action = formData.get("_action");

  switch (_action) {
    case ActionType.Update: {
      const title = invariantString(formData.get("title"));
      const category = invariantString(formData.get("category"));
      const tags = invariantString(formData.get("tags"))
        .split(",")
        .map((s) => s.trim())
        .filter((s) => !!s);
      const banner = invariantString(formData.get("banner"));
      const hidden = formData.get("hidden") === "on";
      const pin = parseInt(invariantString(formData.get("pin")));
      const content = invariantString(formData.get("content"));

      await db.post.update({
        where: { slot },
        data: {
          title,
          category,
          tags,
          banner,
          hidden,
          pin,
          content,
        },
      });

      return { success: true };
    }

    case ActionType.Delete: {
      await db.post.delete({ where: { slot } });

      return redirect("/admin/post");
    }
  }

  throw new Response("What the fuck", { status: 400 });
};

export default function PostEdit() {
  const { post } = useLoaderData<LoaderData>();
  const { state } = useTransition();
  const isSubmitting = state === "submitting";
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    if (actionData?.success) {
      alert("success");
    }
  }, [actionData]);

  return (
    <Card header={<CardTitle title={<TextEditColon suffix={post.title} />} />}>
      <Form method="post">
        <label style={{ display: "block" }}>
          <span>Slot</span>
          <input type="text" disabled value={post.slot} />
        </label>
        <label style={{ display: "block" }}>
          <span>Title</span>
          <input type="text" name="title" defaultValue={post.title} required />
        </label>
        <label style={{ display: "block" }}>
          <span>Category</span>
          <input
            type="text"
            name="category"
            defaultValue={post.category}
            required
          />
        </label>
        <label style={{ display: "block" }}>
          <span>Tags</span>
          <input type="text" name="tags" defaultValue={post.tags.join(", ")} />
        </label>
        <label style={{ display: "block" }}>
          <span>Banner</span>
          <input type="text" name="banner" defaultValue={post.banner} />
        </label>
        <label style={{ display: "block" }}>
          <span>Hidden</span>
          <input type="checkbox" name="hidden" defaultChecked={post.hidden} />
        </label>
        <label style={{ display: "block" }}>
          <span>Pin-Level</span>
          <input
            type="number"
            min={0}
            max={10}
            name="pin"
            defaultValue={post.pin}
            required
          />
        </label>
        <label style={{ display: "block" }}>
          <span>Content</span>
          <textarea name="content" defaultValue={post.content} required />
        </label>
        <Space direction="horizontal">
          <button
            type="submit"
            name="_action"
            value={ActionType.Update}
            disabled={isSubmitting}
          >
            <TextSubmit />
          </button>
          <button
            type="submit"
            name="_action"
            value={ActionType.Delete}
            disabled={isSubmitting}
            style={{ color: "var(--color-red)" }}
          >
            <TextDelete />
          </button>
        </Space>
        <Link to={`/post/${post.slot}`}>
          <TextButton>View</TextButton>
        </Link>
      </Form>
    </Card>
  );
}
