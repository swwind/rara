import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function nowAfter(time: number) {
  return new Date(Date.now() + time);
}

async function seed() {
  const { slot: p1 } = await prisma.post.create({
    data: {
      title: "第一篇测试文章",
      content: `hello world\n\n<!-- more -->\n\nThis is more content`,
      slot: "hello_world",
      category: "Test",
      tags: ["A", "B"],
      createdAt: nowAfter(0),
    },
  });

  const { slot: p2 } = await prisma.post.create({
    data: {
      title: "第二篇测试文章",
      content: `**hello world 2.0**\n\n<!-- more -->\n\nSuch a good father!!!`,
      slot: "foo_bar",
      category: "Default",
      tags: ["B", "C"],
      createdAt: nowAfter(1000),
    },
  });

  const { slot: p3 } = await prisma.post.create({
    data: {
      title: "第三篇测试文章",
      banner: "/avatar.png",
      content: `*hello world 3.0*\n\n<!-- more -->\n\nSuch a good father!!!`,
      slot: "oh_my_god",
      category: "Default",
      tags: ["A", "C"],
      createdAt: nowAfter(1000),
    },
  });

  const { id: rid1 } = await prisma.reply.create({
    data: {
      nickname: "timber3252",
      homepage: "",
      post: { connect: { slot: p1 } },
      content: "我太强啦",
      email: "",
      github: "timber3252",
      qq: "",
    },
  });

  const { id: rid2 } = await prisma.reply.create({
    data: {
      post: { connect: { slot: p1 } },
      nickname: "swwind",
      homepage: "https://swwind.me",
      content: "1. *第二篇回复*\n2. **fake**",
      email: "swwind233@gmail.com",
      github: "",
      qq: "",
    },
  });

  const { id: rid3 } = await prisma.reply.create({
    data: {
      nickname: "Anonymous",
      homepage: "",
      post: { connect: { slot: p1 } },
      replyTo: { connect: { id: rid1 } },
      content: "第san篇回复\n<script>alert('xss')</script>",
      email: "",
      github: "",
      qq: "",
    },
  });
}

seed();
