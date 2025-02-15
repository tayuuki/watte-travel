import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Prisma クライアントのインスタンスを作成
const prisma = new PrismaClient();

// データベースに接続する関数
export const connect = async () => {
    try {
        // Prismaでデータベースに接続
        await prisma.$connect();
    } catch (error) {
        throw new Error("DB接続失敗しました");
    }
}

// データベースからデータを取得する
export const GET = async (req) => {
  try {
      await connect(); // データベース接続
      const todos = await prisma.todo.findMany(); // todosテーブルのデータを取得

      // 成功した場合、データを返す
      return NextResponse.json({ todos }, { status: 200 });

  } catch (error) {
      // エラーが発生した場合、エラーメッセージを返す
      return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });

  } finally {
      // 必ず実行する
      await prisma.$disconnect(); // Prismaの接続を切る
  }
}
