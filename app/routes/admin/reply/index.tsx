import { Post, Reply } from "@prisma/client";
import { Link } from "react-router-dom";
import { LoaderFunction, redirect, useLoaderData } from "remix";
import { TextDelete } from "~/src/Text";
import Card from "~/src/ui/Card";
import TextButton from "~/src/ui/TextButton";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";

type LoaderData = {
  replies: (Pick<Reply, "nickname" | "id"> & {
    post: Pick<Post, "slot" | "title">;
  })[];
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

export default function ReplyManage() {
  const { replies } = useLoaderData<LoaderData>();

  return (
    <Card>
      <table>
        <tbody>
          {replies.map((reply) => (
            <tr key={reply.id}>
              <td style={{ color: "var(--color-grey)" }}>{reply.nickname}</td>
              <td>
                <TextButton>
                  <Link to={`/post/${reply.post.slot}#reply-${reply.id}`}>
                    {reply.post.title}
                  </Link>
                </TextButton>
              </td>
              <td>
                <TextDelete color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
