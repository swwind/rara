import { Post, Reply } from "@prisma/client";
import { Link } from "react-router-dom";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useFetcher,
  useLoaderData,
} from "remix";
import { TextDateTime, TextDelete } from "~/src/Text";
import Card from "~/src/ui/Card";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";
import { invariantString } from "~/utils/utils";

type ReplyData = Pick<Reply, "nickname" | "id" | "content" | "createdAt"> & {
  post: Pick<Post, "slot" | "title">;
};

type LoaderData = {
  replies: ReplyData[];
};

export const loader: LoaderFunction<LoaderData> = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const replies = await db.reply.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      nickname: true,
      content: true,
      createdAt: true,
      post: {
        select: {
          slot: true,
          title: true,
        },
      },
    },
  });

  return { replies };
};

export const action: ActionFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const formData = await request.formData();
  const id = parseInt(invariantString(formData.get("id")));

  await db.reply.delete({
    where: { id },
  });

  return null;
};

function ReplyRow({ reply }: { reply: ReplyData }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <tr key={reply.id}>
      <td>{reply.nickname}</td>
      <td className="color-blue underline">
        <Link to={`/post/${reply.post.slot}#reply-${reply.id}`}>
          {reply.post.title}#{reply.id}
        </Link>
      </td>
      <td className="color-grey">
        <TextDateTime time={new Date(reply.createdAt)} />
      </td>
      <td>
        <fetcher.Form method="post">
          <button
            type="submit"
            name="id"
            value={reply.id}
            disabled={isSubmitting}
          >
            <TextDelete color="red" />
          </button>
        </fetcher.Form>
      </td>
      <td className="color-grey">
        {reply.content.length > 50
          ? reply.content.slice(0, 50) + "..."
          : reply.content}
      </td>
    </tr>
  );
}

export default function ReplyManage() {
  const { replies } = useLoaderData<LoaderData>();

  return (
    <Card>
      <table>
        <tbody>
          {replies.map((reply) => (
            <ReplyRow key={reply.id} reply={reply} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
