"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const createChat = async (title: string) => {
  const response = await fetch("/api/chats", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  return response;
};

interface NewChatDialogProps {
  handleNewChatDialog: () => void;
}

export function NewChatDialog({ handleNewChatDialog }: NewChatDialogProps) {
  const { toast } = useToast();
  const [title, setTitle] = React.useState("");
  const router = useRouter();

  const handleCreateChat = async (title: string) => {
    const response = await createChat(title);
    if (response.ok) {
      const data = await response.json();
      handleNewChatDialog();
      router.push(`/chat/${data[0].thread_id}`);
    } else {
      toast({
        description: "Erro ao criar chat",
        variant: "destructive",
        duration: 3000,
      });
    }
    setTitle("");
  };

  return (
    <DialogContent
      className="sm:max-w-[425px]"
      onInteractOutside={handleNewChatDialog}
    >
      <DialogHeader>
        <DialogTitle>Criar Chat</DialogTitle>
        <DialogDescription>Informe o título do chat</DialogDescription>
      </DialogHeader>
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
        <Button variant="secondary" onClick={handleNewChatDialog}>
          Cancelar
        </Button>
        <Button onClick={() => handleCreateChat(title)}>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
