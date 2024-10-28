"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { Wallet as EthersWallet } from "ethers";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Shield,
  Wallet as WalletIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Wallet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<{ [key: number]: boolean }>({});
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string; type: string }[]
  >([]);

  const handleGenerateWallet = () => {
    const generatedMnemonic = generateMnemonic(128);
    setMnemonic(generatedMnemonic);
    setMnemonicWords(generatedMnemonic.split(" "));
    toast.success("New wallet generated successfully!");
  };

  const generateEthWallet = async () => {
    if (!mnemonic) return;
  
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
  
    const hdNode = HDNodeWallet.fromSeed(seed).derivePath(derivationPath);
    
    const ethWallet = new EthersWallet(hdNode.privateKey); 
  
    const newWallet = {
      publicKey: ethWallet.address,
      privateKey: hdNode.privateKey,
      type: "Ethereum",
    };
  
    setWallets((prevWallets) => [...prevWallets, newWallet]);
    setCurrentIndex(currentIndex + 1);
    toast.success("Ethereum wallet added successfully!");
  };
  
  

  const generateSolanaWallet = () => {
    if (!mnemonic) return;

    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString()).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const newWallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(keypair.secretKey).toString("base64"),
      type: "Solana",
    };

    setWallets((prevWallets) => [...prevWallets, newWallet]);
    setCurrentIndex(currentIndex + 1);
    toast.success("Solana wallet added successfully!");
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const togglePrivateKey = (index: number) => {
    setShowPrivateKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mt-20 mx-auto py-8 px-4 space-y-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Crypto Wallet Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate and manage your cryptocurrency wallets securely.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Secret Recovery Phrase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="password"
                placeholder="Enter your secret phrase (or leave blank to generate)"
                className="flex-1"
              />
              <Button onClick={handleGenerateWallet} className="whitespace-nowrap">
                <WalletIcon className="mr-2 h-4 w-4" />
                Generate Wallet
              </Button>
            </div>

            {mnemonicWords.length > 0 && (
              <Collapsible
                open={showMnemonic}
                onOpenChange={setShowMnemonic}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Secret Phrase</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {showMnemonic ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-4">
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {mnemonicWords.map((word, index) => (
                      <div
                        key={index}
                        className="bg-secondary p-2 rounded-md text-center"
                      >
                        <span className="text-muted-foreground text-sm">{index + 1}.</span>{" "}
                        {word}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => copyToClipboard(mnemonic || "")}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Secret Phrase
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </Card>

        {mnemonic && (
          <div className="flex gap-4">
            <Button onClick={generateSolanaWallet} className="flex-1">
              Add Solana Wallet
            </Button>
            <Button onClick={generateEthWallet} className="flex-1">
              Add Ethereum Wallet
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {wallets.map((wallet, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {wallet.type} Wallet {index + 1}
                    <Badge variant="secondary">{wallet.type}</Badge>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Public Key</label>
                  <div
                    onClick={() => copyToClipboard(wallet.publicKey)}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    <code className="text-sm truncate">{wallet.publicKey}</code>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Private Key</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePrivateKey(index)}
                    >
                      {showPrivateKeys[index] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div
                    onClick={() => copyToClipboard(wallet.privateKey)}
                    className="flex items-center justify-between p-2 bg-secondary rounded-md cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    <code className="text-sm truncate">
                      {showPrivateKeys[index]
                        ? wallet.privateKey
                        : "••••••••••••••••••••••••••••••••"}
                    </code>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      </div>
  )}