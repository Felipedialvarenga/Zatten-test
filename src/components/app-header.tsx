import { SignedIn, UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SignedIn>
          <SidebarTrigger />
        </SignedIn>
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">Zatten-Test</h1>
        </Link>
      </div>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
    </header>
  );
}
