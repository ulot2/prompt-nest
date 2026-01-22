import { prisma } from "./lib/db";

async function main() {
  console.log("Attempting to connect...");
  try {
    await prisma.$connect();
    console.log("Connected successfully!");
  } catch (e) {
    console.error("Connection failed:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
