"use client";

import { Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Chat } from "@/types";
import { useParams } from "next/navigation";
import supabase from "@/utils/supabase";

const getChats = async () => {
  const response = await fetch("/api/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export function AppSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const threadId = useParams().id;

  useEffect(() => {
    const channel = supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
        },
        () => {
          getChats().then((chats) => setChats(chats.data));
        }
      )
      .subscribe();

    getChats().then((chats) => setChats(chats.data));

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <DialogTrigger asChild>
            <SidebarGroupAction title="Novo Chat">
              <Plus /> <span className="sr-only">Novo Chat</span>
            </SidebarGroupAction>
          </DialogTrigger>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id} className="flex justify-between">
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/chat/${chat.thread_id}`}
                      className={`hover:bg-zinc-200 duration-300 ease-in ${
                        threadId == chat.thread_id
                          ? "bg-zinc-200"
                          : "bg-transparent"
                      }`}
                    >
                      <span>{chat.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
