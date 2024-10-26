"use client";
import { useRouter } from "next/navigation";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/wallet");
  };
  return (
    <header className="fixed w-full top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container pl-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6" />
          <span className="text-xl font-bold">CryptoVault</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {/*  */}
          <Button onClick={handleGetStarted}>Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
