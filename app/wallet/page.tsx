"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMnemonic, 
  // mnemonicToSeedSync,
  //  validateMnemonic 
  } from "bip39";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Coins, Wallet } from "lucide-react";
import {
  ChevronDown,
  ChevronUp,
  // Copy,
  // Eye,
  // EyeOff,
  // Grid2X2,
  // List,
  // Trash,
} from "lucide-react";

export default function WalletGenerator() {
  const [selectedChain, setSelectedChain] = useState<
    "solana" | "ethereum" | null
  >(null);
  const [mnemonicInput, setMnemonicInput] = useState("");
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [showMnemonic, setShowMnemonic] = useState(false);
  // const [gridView, setGridView] = useState<boolean>(false);

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

  const handleGenerateWallet = () => {
    const mnemonic = generateMnemonic(128);
    const wordsArray = mnemonic.split(" ");
    setMnemonicWords(wordsArray);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      {wallets.length === 0 && (
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {!selectedChain && (
            <section className="py-20 bg-background" id="blockchain-selector">
              <div className="container px-4 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Choose Your Blockchain
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {blockchains.map((chain) => (
                    <Card
                      key={chain.id}
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        selectedChain === chain.id ? "border-primary" : ""
                      }`}
                      onClick={() =>
                        setSelectedChain(chain.id as "solana" | "ethereum")
                      }
                    >
                      <CardContent className="flex flex-col items-center p-6">
                        <chain.icon className="w-16 h-16 mb-4 text-primary" />
                        <h3 className="text-2xl font-semibold mb-2">
                          {chain.name}
                        </h3>
                        <p className="text-muted-foreground text-center">
                          {chain.description}
                        </p>
                        <Button
                          className="mt-6"
                          variant={
                            selectedChain === chain.id ? "default" : "outline"
                          }
                        >
                          Select {chain.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {selectedChain && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col gap-4 my-12 mt-32"
            >
              <div className="flex  flex-col gap-2">
                <h1 className="tracking-tighter text-4xl md:text-5xl font-black">
                  Secret Recovery Phrase
                </h1>
                <p className="text-primary/80 font-semibold text-lg md:text-xl">
                  Save these words in a safe place.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="password"
                  placeholder="Enter your secret phrase (or leave blank to generate)"
                  onChange={(e) => setMnemonicInput(e.target.value)}
                  value={mnemonicInput}
                  className="input-class w-full max-w-xl"
                />

                <Button size={"lg"} onClick={handleGenerateWallet}>
                  {mnemonicInput ? "Add Wallet" : "Generate Wallet"}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {mnemonicWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Your Secret Phrase
            </h2>
            <Button
              onClick={() => setShowMnemonic(!showMnemonic)}
              variant="ghost"
            >
              {showMnemonic ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>

          {showMnemonic && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
            >
              {mnemonicWords.map((word, index) => (
                <p
                  key={index}
                  className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                >
                  {word}
                </p>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
