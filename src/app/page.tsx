import { Button } from "@/components/ui/button";

import { DialogTrigger } from "@radix-ui/react-dialog";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 mt-[12vh]">
      <p className="text-2xl font-bold text-primary">
        Selecione um chat ou crie um novo e comece a conversar
      </p>
      <DialogTrigger asChild>
        <Button>Criar Chat</Button>
      </DialogTrigger>
    </div>
  );
}
