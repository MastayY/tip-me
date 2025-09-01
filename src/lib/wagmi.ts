import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, metaMaskWallet, okxWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { baseSepolia } from "wagmi/chains";
import { createConfig, http } from '@wagmi/core'

const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC;
const projectId = process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID;

if (!projectId) {
  throw new Error("Error: NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID is not set in .env.local");
}
if (!rpcUrl) {
  throw new Error("Error: NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_RPC is not set in .env.local");
}

const appName = 'TipMe';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Suggested',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        okxWallet,
        trustWallet,
        walletConnectWallet,
      ],
    },
  ],
  { appName, projectId }
);

export const WagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors,
    transports: {
        [baseSepolia.id]: http(rpcUrl)
    },
    ssr: true,
});