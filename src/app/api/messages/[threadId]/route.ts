import { createMessage, deleteThread, getMessages } from "@/utils/openAI";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { threadId: string } }) {
    const { userId } = getAuth(req);
    const { threadId } = await params;
    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
  
    const messages = await getMessages(threadId);
    return NextResponse.json(messages.data);
  }

export async function POST(req: NextRequest, { params }: { params: { threadId: string } }) {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { threadId } = await params;
    const { messageText } = await req.json();
    const message = await createMessage({ threadId, content: messageText });
    return NextResponse.json(message);
  }

export async function DELETE(req: NextRequest, { params }: { params: { threadId: string } }) {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    
    const { threadId } = await params;
    const message = await deleteThread(threadId);
    return NextResponse.json(message);
  }

