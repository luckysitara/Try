import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

export const network = WalletAdapterNetwork.Devnet
export const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network)

export const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new TorusWalletAdapter()]

