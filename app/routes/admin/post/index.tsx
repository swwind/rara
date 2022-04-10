import { Post } from "@prisma/client";
import { Link, LoaderFunction, redirect, useLoaderData } from "remix";
import {
  TextDateTime,
  TextEdit,
  TextHidden,
  TextManagePosts,
} from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import TextButton from "~/src/ui/TextButton";
import { authenticate } from "~/utils/authenticate";
import { db } from "~/utils/db.server";

type LoaderData = {
  posts: Pick<Post, "title" | "slot" | "createdAt" | "hidden">[];
};

export const loader: LoaderFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      slot: true,
      createdAt: true,
      hidden: true,
    },
  });

  return { posts };
};

export default function PostManage() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <Card header={<CardTitle title={<TextManagePosts />} />}>
      <table>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slot}>
              <td>
                <Link to={`/post/${post.slot}`}>{post.title}</Link>
              </td>
              <td>
                <Link to={`/admin/post/edit/${post.slot}`}>
                  <TextButton>
                    <TextEdit />
                  </TextButton>
                </Link>
              </td>
              <td>{post.hidden && <TextHidden color="pink" />}</td>
              <td style={{ color: "var(--color-grey)" }}>
                <TextDateTime time={new Date(post.createdAt)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
