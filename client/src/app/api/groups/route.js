import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, members } = body;

    if (!name || !members || members.length === 0) {
      return new Response(JSON.stringify({ error: "無効な入力です" }), { status: 400 });
    }

    // ランダムな groupid を生成
    const groupid = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

    // グループを作成
    const group = await prisma.group.create({
      data: {
        groupid,
        name,
      },
    });

    // メンバーを作成
    const memberPromises = members.map((memberName) =>
      prisma.member.create({
        data: {
          name: memberName,
          money: 0, // 初期値 0
          groupId: group.id,
        },
      })
    );

    await Promise.all(memberPromises);

    return new Response(JSON.stringify({ groupid }), { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), { status: 500 });
  }
}
