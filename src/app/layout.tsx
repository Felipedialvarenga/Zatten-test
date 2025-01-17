"use client";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/app-header";
import { Dialog } from "@radix-ui/react-dialog";
import { NewChatDialog } from "@/components/new-chat-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);
  const handleNewChatDialog = () => setOpenNewChatDialog(!openNewChatDialog);
  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html>
        <body>
          <Dialog open={openNewChatDialog}>
            <NewChatDialog handleNewChatDialog={handleNewChatDialog} />
            <SidebarProvider defaultOpen={true}>
              <SignedIn>
                <AppSidebar handleNewChatDialog={handleNewChatDialog} />
              </SignedIn>
              <main className="w-full p-4">
                <Header />
                {children}
              </main>
              <Toaster />
            </SidebarProvider>
          </Dialog>
        </body>
      </html>
    </ClerkProvider>
  );
}
