const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const comments = await prisma.comment.findMany();
  console.log(`Found ${comments.length} comments. Syncing dates...`);

  for (const comment of comments) {
    await prisma.comment.update({
      where: { id: comment.id },
      data: { updatedAt: comment.createdAt },
    });
  }

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
