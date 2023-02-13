import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import style from "../../styles/notifiCard.module.sass";
import React from "react";

interface INotifiCardProps {
  appAddress: string;
  cardId: string;
}

export const NotifiCard: React.FC<INotifiCardProps> = ({ appAddress, cardId }) => {
  const { connection } = useConnection();
  const { wallet, sendTransaction, signMessage } = useWallet();
  const adapter = wallet?.adapter;
  const publicKey = adapter?.publicKey?.toBase58() ?? null;

  if (publicKey === null || signMessage === undefined) {
    // publicKey is required
    return null;
  }

  const inputLabels: NotifiInputFieldsText = {
    label: {
      email: "Email",
      sms: "Text Message",
      telegram: "Telegram",
    },
    placeholderText: {
      email: "Email",
    },
  };

  const inputSeparators: NotifiInputSeparators = {
    smsSeparator: {
      content: "OR",
    },
    emailSeparator: {
      content: "OR",
    },
    telegramSeparator: {
      content: "OR",
    },
  };

  return (
    <div className={style.notifiCard}>
      <div className={style.innerCard}>
        <NotifiContext
          dappAddress={appAddress}
          walletBlockchain="SOLANA"
          env="Development"
          walletPublicKey={publicKey}
          connection={connection}
          sendTransaction={sendTransaction}
          signMessage={signMessage}
        >
          <NotifiSubscriptionCard
            darkMode
            inputLabels={inputLabels}
            inputSeparators={inputSeparators}
            cardId={cardId}
          />
        </NotifiContext>
      </div>
    </div>
  );
};

// Test appAddress: "colorfullife"
// Test cardId: "51fd3e3da1104f15abe4e1f8df46747e"
