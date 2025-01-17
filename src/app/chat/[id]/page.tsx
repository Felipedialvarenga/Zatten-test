"use client";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Message } from "@/types";
import ChatLoading from "./chat-loading";

const getChatMessages = async (threadId: string) => {
  const response = await fetch(`/api/messages?threadId=${threadId}`);
  const messages = await response.json();
  return messages;
};

const sendMessage = async (threadId: string, messageText: string) => {
  const response = await fetch(`/api/messages?threadId=${threadId}`, {
    method: "POST",
    body: JSON.stringify({ messageText }),
  });
  const message = await response.json();
  return message;
};

const runAssistant = async (threadId: string) => {
  const response = await fetch(`/api/runs`, {
    method: "POST",
    body: JSON.stringify({ threadId }),
  });
  const run = await response.json();
  return run;
};

export default function ChatPage() {
  const threadId = useParams().id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [runInProgress, setRunInProgress] = useState(false);
  const router = useRouter();

  const loadMessages = useCallback(async () => {
    const chatMessages = await getChatMessages(threadId as string);
    console.log(chatMessages);
    if (chatMessages?.error == "Chat inexistente") {
      router.push("/");
      return;
    }
    setMessages(chatMessages);
    setLoaded(true);
  }, [threadId, router]);

  useEffect(() => {
    if (threadId) {
      loadMessages();
    }
  }, [loadMessages, threadId]);

  const handleSendMessage = async (message: string) => {
    const newMessage = await sendMessage(threadId as string, message);
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setRunInProgress(true);
    await runAssistant(threadId as string);
    loadMessages();
    setRunInProgress(false);
  };

  const noMessages = messages.length === 0;

  return (
    <div className="justify-between flex flex-col h-full max-h-[calc(100vh-70px)]">
      {!loaded && <ChatLoading />}
      {loaded && noMessages && (
        <p className="text-center text-gray-500 mt-[calc(50vh-70px)]">
          Envie sua primeira mensagem
        </p>
      )}
      <ChatMessages chatMessages={messages} runInProgress={runInProgress} />
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
}
