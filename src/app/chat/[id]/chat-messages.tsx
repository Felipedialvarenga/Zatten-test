import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ChatTyping from "./chat-typing";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type UserChatProps = {
  chatMessages: Message[];
  runInProgress: boolean;
};
export default function UserChat({
  chatMessages,
  runInProgress,
}: UserChatProps) {
  const user = useUser();
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div />
      {runInProgress && <ChatTyping />}
      {chatMessages?.map((message, index) => {
        const isUserMsg = message.role === "user";
        const hasNextMessageFromSameUser =
          chatMessages[index - 1]?.role === chatMessages[index].role;

        return (
          <div className="" key={`${message.id}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": isUserMsg,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isUserMsg,
                    "order-2 items-start": !isUserMsg,
                  }
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-chat text-white": isUserMsg,
                    "bg-gray-200 text-gray-900": !isUserMsg,
                    "rounded-br-none": !hasNextMessageFromSameUser && isUserMsg,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isUserMsg,
                  })}
                >
                  <ReactMarkdown>{message.content[0].text.value}</ReactMarkdown>
                </span>
              </div>

              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isUserMsg,
                  "order-1": !isUserMsg,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <div className="w-6 h-6 bg-zinc-200 rounded-full">
                  {isUserMsg && user.user?.imageUrl && (
                    <Image
                      src={user.user!.imageUrl!}
                      alt="user's profile picture"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  {isUserMsg && !user.user?.imageUrl && <User />}
                  {!isUserMsg && <Bot />}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
