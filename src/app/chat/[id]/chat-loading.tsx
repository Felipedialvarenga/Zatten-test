import { Loader2 } from "lucide-react";

export default function ChatLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <span className="animate-spin text-primary size-8">
        <Loader2 />
      </span>
    </div>
  );
}
