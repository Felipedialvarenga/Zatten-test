import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/app-header";
import { Dialog } from "@radix-ui/react-dialog";
import { NewChatDialog } from "@/components/new-chat-dialog";
import { Toaster } from "@/components/ui/toaster";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <body>
          <Dialog>
            <NewChatDialog />
            <SidebarProvider defaultOpen={true}>
              <SignedIn>
                <AppSidebar />
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
