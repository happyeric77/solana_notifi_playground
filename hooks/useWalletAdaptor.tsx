require("@solana/wallet-adapter-react-ui/styles.css");
import React, { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Commitment } from "@solana/web3.js";

export enum rpcEndpoints {
  mainnetBeta = "https://solana-api.tt-prod.net",
  mainGenesysgo = "https://ssc-dao.genesysgo.net",
  mainRPCPool = "https://free.rpcpool.com",
  mainANKR = "https://rpc.ankr.com/solana",
  mainnetSerum = "https://solana-api.projectserum.com", // DEPRECATED
}

export const Wallet: FC = (props) => {
  let hostname = "";

  if (typeof window !== "undefined") {
    hostname = window.location.hostname;
  }

  let selectedEndPoint: string = rpcEndpoints.mainGenesysgo;
  let wsEndpoint: string = "";

  switch (selectedEndPoint) {
    case rpcEndpoints.mainGenesysgo:
      wsEndpoint = "wss://ssc-dao.genesysgo.net/";
      break;
    case rpcEndpoints.mainnetSerum:
      wsEndpoint = "wss://solana-api.projectserum.com/ws";
      break;
    default:
      wsEndpoint = "";
      break;
  }

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = selectedEndPoint;
  const config = {
    wsEndpoint,
    confirmTransactionInitialTimeout: 300 * 1000,
    commitment: "confirmed" as Commitment,
  };

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={config}>
      <WalletProvider wallets={wallets} autoConnect>
        {props.children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
