"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface NewChatFormProps {
  createChat: (title: string) => Promise<Response>;
}
export function NewChatForm({ createChat }: NewChatFormProps) {
  const [title, setTitle] = useState("");

  const handleCreateChat = async (title: string) => {
    const response = await createChat(title);
    const data = await response.json();
    if (response.ok) {
      toast({
        description: data.message,
      });
    } else {
      toast({
        description: data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Título</Label>
          <Input
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => handleCreateChat(title)}>Salvar</Button>
      </DialogFooter>
    </>
  );
}
