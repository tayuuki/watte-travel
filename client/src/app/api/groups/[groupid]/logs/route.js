import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { amount, payerId, groupid } = await req.json();

    // 必須パラメータの確認
    if (!amount || !payerId || !groupid) {
      return new Response(JSON.stringify({ error: "必要なパラメータが不足しています" }), { status: 400 });
    }

    // 支払者の存在確認
    const payer = await prisma.member.findUnique({
      where: { id: payerId },
    });

    if (!payer) {
      return new Response(JSON.stringify({ error: "支払者が見つかりません" }), { status: 404 });
    }

    // グループの存在確認
    const group = await prisma.group.findUnique({
      where: { id: groupid },
    });

    if (!group) {
      return new Response(JSON.stringify({ error: "グループが見つかりません" }), { status: 404 });
    }

    // `Log`の作成（参加者なし）
    const log = await prisma.log.create({
      data: {
        amount,
        payer: { connect: { id: payerId } },
        group: { connect: { id: groupid } },
      },
    });

    return new Response(JSON.stringify({ message: "ログが正常に追加されました", log }), { status: 201 });
  } catch (error) {
    console.error("Error adding log:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), { status: 500 });
  }
}
