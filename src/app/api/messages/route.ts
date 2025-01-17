import { createMessage, deleteThread, getMessages, getThread } from "@/utils/openAI";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = getAuth(req);
    const threadId = req.nextUrl.searchParams.get("threadId");
    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }
  
    if(!threadId){
      return NextResponse.json({ error: "Chat não providenciado" }, { status: 400 })
    }

    try{
        await getThread(threadId)
    } catch {
        return NextResponse.json({ error: "Chat inexistente" }, { status: 400 })
    }
    

    const messages = await getMessages(threadId);
    return NextResponse.json(messages.data);
  }

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const threadId = req.nextUrl.searchParams.get("threadId");

    if(!threadId){
        return NextResponse.json({ error: "Chat não providenciado" }, { status: 400 })
      }

    const { messageText } = await req.json();
    const message = await createMessage({ threadId, content: messageText });
    return NextResponse.json(message);
  }

export async function DELETE(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    
    const threadId = req.nextUrl.searchParams.get("threadId");
    if(!threadId){
        return NextResponse.json({ error: "Chat não providenciado" }, { status: 400 })
      }
    const message = await deleteThread(threadId);
    return NextResponse.json(message);
  }

