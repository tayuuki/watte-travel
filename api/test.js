// api/test.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    // Prisma のクエリを実行して、データを取得
    const groups = await prisma.group.findMany();
    console.log(groups); // データがコンソールに表示される

    return res.status(200).json(groups);
  } catch (error) {
    console.error(error); // エラーログを表示
    return res.status(500).json({ error: error.message });
  }
}
