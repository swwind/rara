import { Post } from "@prisma/client";
import { db } from "./db.server";

import metadata from "~/metadata.json";

/**
 * Required post fields for showing in the list
 */
export type PostBriefData = Pick<
  Post,
  | "url"
  | "banner"
  | "views"
  | "category"
  | "tags"
  | "createdAt"
  | "title"
  | "pin"
> & {
  description: string;
};

type NonNullable<T> = T extends null | undefined ? never : T;

export async function getPostBriefDataList(
  where: NonNullable<Parameters<typeof db.post.findMany>[0]>["where"],
  page: number
): Promise<{ posts: PostBriefData[]; total: number }> {
  const posts = await db.post.findMany({
    where,
    take: metadata.post_per_page,
    skip: (page - 1) * metadata.post_per_page,
    orderBy: [{ pin: "desc" }, { createdAt: "desc" }],
    select: {
      url: true,
      banner: true,
      views: true,
      category: true,
      tags: true,
      createdAt: true,
      title: true,
      pin: true,
      content: true,
    },
  });

  const total = await db.post.count({ where });

  return {
    posts: posts.map(({ content, ...post }) => {
      const index = content.indexOf("<!-- more -->");
      const description = index === -1 ? content : content.slice(0, index);

      return {
        ...post,
        description,
      };
    }),
    total,
  };
}
