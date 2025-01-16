"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

type UserInputProps = {
  handleSendMessage: (message: string) => void;
};

export default function UserInput({ handleSendMessage }: UserInputProps) {
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const onSendMessage = () => {
    handleSendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 flex gap-2 ">
      <div className="relative flex-1 rounded-xl overflow-auto shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary max-h-[90px]">
        <TextareaAutosize
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="p-2 block w-full resize-none border-0 overflow-hidden outline-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex items-end">
        <Button onClick={onSendMessage}>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}
