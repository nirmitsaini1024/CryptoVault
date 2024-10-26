"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Wallet } from "lucide-react";

export function BlockchainSelector() {
  const [selectedChain, setSelectedChain] = useState<"solana" | "ethereum" | null>(null);

  const blockchains = [
    {
      id: "solana",
      name: "Solana",
      icon: Coins,
      description: "Fast, secure, and scalable blockchain platform",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      icon: Wallet,
      description: "Decentralized platform for smart contracts",
    },
  ];

  return (
    <section className="py-20 bg-muted/50" id="blockchain-selector">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
           Supported Blockchain
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blockchains.map((chain) => (
            <Card
              key={chain.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedChain === chain.id ? "border-primary" : ""
              }`}
              
            >
              <CardContent className="flex flex-col items-center p-6">
                <chain.icon className="w-16 h-16 mb-4 text-primary" />
                <h3 className="text-2xl font-semibold mb-2">{chain.name}</h3>
                
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}