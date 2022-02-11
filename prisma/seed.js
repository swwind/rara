const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {

  await prisma.post.create({
    data: {
      url: 'test',
      title: 'Test',
      content: 'This is your first post',
    }
  });

})();