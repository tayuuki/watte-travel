import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    if (!params || !params.groupid) {
      return new Response(JSON.stringify({ error: "無効なパラメータ" }), { status: 400 });
    }

    const groupid = params.groupid; // ここではawaitは不要

    const group = await prisma.group.findUnique({
      where: { groupid },
      include: {
        members: true,
        logs: {
          include: {
            participants: true,
            payer: true,
          },
        },
      },
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
