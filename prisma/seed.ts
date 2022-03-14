import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function nowAfter(time: number) {
  return new Date(Date.now() + time);
}

async function seed() {
  const { url: p1 } = await prisma.post.create({
    data: {
      title: "第一篇测试文章",
      content: `hello world\n\n<!-- more -->\n\nThis is more content`,
      url: "hello_world",
      category: "Test",
      tags: ["A", "B"],
      createdAt: nowAfter(0),
    },
  });

  const { url: p2 } = await prisma.post.create({
    data: {
      title: "第二篇测试文章",
      content: `**hello world 2.0**\n\n<!-- more -->\n\nSuch a good father!!!`,
      url: "foo_bar",
      category: "Default",
      tags: ["B", "C"],
      createdAt: nowAfter(1000),
    },
  });

  const { url: p3 } = await prisma.post.create({
    data: {
      title: "第三篇测试文章",
      banner: "/avatar.png",
      content: `*hello world 3.0*\n\n<!-- more -->\n\nSuch a good father!!!`,
      url: "oh_my_god",
      category: "Default",
      tags: ["A", "C"],
      createdAt: nowAfter(1000),
    },
  });

  const { id: rid1 } = await prisma.reply.create({
    data: {
      post: { connect: { url: p1 } },
      content: "第一篇回复",
    },
  });

  const { id: rid2 } = await prisma.reply.create({
    data: {
      post: { connect: { url: p1 } },
      nickname: "swwind",
      email: "i@sww.moe",
      homepage: "https://swwind.me",
      content: "1. *第二篇回复*\n2. **fake**",
    },
  });

  const { id: rid3 } = await prisma.reply.create({
    data: {
      post: { connect: { url: p1 } },
      replyTo: { connect: { id: rid1 } },
      content: "第san篇回复\n<script>alert('xss')</script>",
    },
  });
}

seed();
