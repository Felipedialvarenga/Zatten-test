import { Bot } from "lucide-react";

export default function ChatTyping() {
  return (
    <div className="flex gap-3">
      <div className="relative w-6 h-6">
        <div className="w-6 h-6 bg-zinc-200 rounded-full">
          <Bot />
        </div>
      </div>
      <div className="flex items-center space-x-3 pt-3 text-gray-600 text-sm">
        <div className="flex h-full items-end space-x-1">
          <div className="h-5 animate-bounce  animation-delay-200">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
          </div>
          <div className="h-5 animate-bounce animation-delay-300">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
          </div>
          <div className="h-5 animate-bounce animation-delay-400">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
