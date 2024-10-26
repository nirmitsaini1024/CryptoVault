import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { BlockchainSelector } from "@/components/blockchain-selector";
import { Features } from "@/components/features";
import { Steps } from "@/components/steps";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <BlockchainSelector />
      <Steps />
      <Features />
    </main>
  );
}
