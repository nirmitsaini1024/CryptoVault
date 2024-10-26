"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Link, GitMerge } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Multi-Blockchain Support",
      description: "Seamlessly manage both Solana and Ethereum wallets from a single interface",
      icon: Wallet,
    },
    {
      title: "Mnemonic Generation",
      description: "Secure wallet creation with industry-standard mnemonic phrase generation",
      icon: Shield,
    },
    {
      title: "Linked Wallets",
      description: "Connect multiple wallets under a single mnemonic for easier management",
      icon: Link,
    },
    {
      title: "Hierarchical Management",
      description: "Organize your wallets with hierarchical deterministic paths",
      icon: GitMerge,
    },
  ];

  return (
    <section className="py-20 bg-muted/50" id="features">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Your Crypto Journey
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}