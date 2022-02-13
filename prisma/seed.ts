import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function nowAfter(time: number) {
  return new Date(Date.now() + time);
}

(async () => {
  const result = await prisma.post.createMany({
    data: [
      {
        title: "第一篇测试文章",
        content: `hello world\n\n<!-- more -->\n\nThis is more content`,
        url: "hello_world",
        category: "Test",
        tags: ["A", "B"],
        createdAt: nowAfter(0),
      },
      {
        title: "第二篇测试文章",
        content: `**hello world 2.0**\n\n<!-- more -->\n\nSuch a good father!!!`,
        url: "foo_bar",
        category: "Default",
        tags: ["B", "C"],
        createdAt: nowAfter(1000),
      },
      {
        title: "第三篇测试文章",
        banner: "/avatar.png",
        content: `*hello world 3.0*\n\n<!-- more -->\n\nSuch a good father!!!`,
        url: "oh_my_god",
        category: "Default",
        tags: ["A", "C"],
        createdAt: nowAfter(1000),
      },
    ],
  });

  console.log(result);
})();
