"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-background">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Your Gateway to Solana & Ethereum Wallets
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create, manage, and secure your crypto wallets with a single mnemonic phrase. 
          Built for both Solana and Ethereum blockchains.
        </p>
        <Button size="lg" className="text-lg px-8">
          Get Started
        </Button>
      </div>
    </section>
  );
}