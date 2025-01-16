import { NextRequest, NextResponse } from "next/server";
import supabase from "@/utils/supabase";
import { createThread } from "@/utils/openAI";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { title} = await req.json();
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const thread = await createThread();
  const { data, error } = await supabase.from("chats").insert({
    title,
    thread_id: thread.id,
    user_id: userId,
  }).select();
  if (error) {
    console.log(error)
    return NextResponse.json({ error: "Erro ao criar o chat" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const chats = await supabase.from("chats").select("*").eq("user_id", userId);
  return NextResponse.json(chats);
}

