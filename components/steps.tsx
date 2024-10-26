"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Key, Layers } from "lucide-react";

export function Steps() {
  const steps = [
    {
      title: "Choose Your Blockchain",
      description: "Select between Solana or Ethereum as your preferred blockchain",
      icon: Wallet,
    },
    {
      title: "Generate Your Wallet",
      description: "Securely create your wallet with a unique mnemonic phrase",
      icon: Key,
    },
    {
      title: "Add More Wallets",
      description: "Create additional wallets under the same mnemonic",
      icon: Layers,
    },
  ];

  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Get Started in Three Simple Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative border-2">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary rounded-full p-4">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground mb-2 block">
                  Step {index + 1}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}