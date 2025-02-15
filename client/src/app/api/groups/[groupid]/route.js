import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { groupid } = params;

    const group = await prisma.group.findUnique({
      where: { groupid },
      include: { members: true },
    });

    if (!group) {
      return new Response(JSON.stringify({ error: "グループが見つかりません" }), { status: 404 });
    }

    return new Response(JSON.stringify(group), { status: 200 });
  } catch (error) {
    console.error("Error fetching group:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), { status: 500 });
  }
}
