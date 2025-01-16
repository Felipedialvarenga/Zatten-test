import { createRun, getAssistant, getMessages, getRun} from "@/utils/openAI";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const { threadId, } = await req.json();
    const assistant = await getAssistant();
    let run;
    let assistantResponse = {};

    try {
        run = await createRun({ threadId, assistantId: assistant.id });
    } catch {
        return NextResponse.json({ error: "Erro ao processar a mensagem" }, { status: 500 })
    }

    while (true) {
        const retrievedRun = await getRun(threadId, run.id);
        if(retrievedRun.status === "completed") {
            const allMessages = await getMessages(threadId);
            assistantResponse = allMessages.data[allMessages.data.length - 1];
            break;
        } else if( retrievedRun.status === "queued" || retrievedRun.status === "in_progress") {
            await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
            break;
        }
    }
    
    if(!assistantResponse) {
        return NextResponse.json({ error: "Erro ao processar a mensagem" }, { status: 500 })
    }
    return NextResponse.json(assistantResponse);
  }