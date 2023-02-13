import { INotifiInfo } from "../hooks/useNotifiInfo";

export const step1code = (notifiInfo: INotifiInfo) => `
import {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import "@notifi-network/notifi-react-card/dist/index.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React from "react";

export const NotifiCard: React.FC = () => {
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
          dappAddress="${notifiInfo.appAddress}"
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
            cardId="${notifiInfo.cardId}"
          />
        </NotifiContext>
      </div>
    </div>
  );
};
`;

export const step2code = (notifiInfo: INotifiInfo, msgTitle: string, msgDescription: string) => `
import { NotifiClient, NotifiEnvironment, createGraphQLClient, createNotifiService } from "@notifi-network/notifi-node";

export type INotifiResponse = {
  success: boolean;
  error: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<INotifiResponse>) {
  const env: NotifiEnvironment = "Development";
  const gqlClient = createGraphQLClient(env);
  const notifiService = createNotifiService(gqlClient);
  const client = new NotifiClient(notifiService);
  const msgTitle = req.query["msgTitle"] as string;
  const msgDescription = req.query["msgDescription"] as string;

  let status = 200;
  let success = true;
  let error = null;
  try {
    const { token, expiry } = await client.logIn({
      sid: "${notifiInfo.sid}",
      secret: "${notifiInfo.sidSecret}",
    });
    await client.sendBroadcastMessage(token, {
      idempotencyKey: Math.random().toString(), // Message ID
      topicName: "${notifiInfo.broadcastId}", 
      targetTemplates: { key: "EMAIL", value: "Announcement from node" },
      variables: [
        { key: "message", value: ${msgTitle}},
        { key: "subject", value: ${msgDescription}},
      ],,
    });
  } catch (e) {
    status = 404;
    error = JSON.stringify(e);
    success = false;
  }
  console.log({ status });
  res.status(status).json({ success, error });
}


`;

export const codeUserData = (notifiInfo: INotifiInfo) => `
import { FC, useMemo, useState } from "react";
import { SignMessageParams, useNotifiClient } from "@notifi-network/notifi-react-hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNotifiInfo } from "../hooks/useNotifiInfo";

const User: FC = () => {
  const wallet = useWallet();
  const { setNotify } = useNotify();
  const { notifiInfo } = useNotifiInfo();
  const notifiClient = useNotifiClient({
    dappAddress: ${notifiInfo.appAddress},
    walletBlockchain: "SOLANA",
    env: "Development",
    walletPublicKey: wallet.publicKey?.toBase58() || "0x0",
  });
  const [userData, setUserData] = useState<IUserData>({} as IUserData);
  const [userMsgs, setUserMsgs] = useState<IUserMsgs>({} as IUserMsgs);

  const handleLogin = async () => {
    if (!wallet.publicKey) {
      throw new Error("no public key");
    }
    if (!wallet.signMessage) {
      throw new Error("no sign message");
    }
    const signer: SignMessageParams = {
      walletBlockchain: "SOLANA",
      signMessage: async (buffer: Uint8Array) => {
        const result = await wallet.signMessage!(buffer);
        return result;
      },
    };

    await notifiClient.logIn(signer);
  };
  const test = async () => {
    try {
      const data = await notifiClient.fetchData();
      const his = await notifiClient.getNotificationHistory({ first: 50 });
      //@ts-ignore
      setUserData(data);
      setUserMsgs(his);
      // const topics = await notifiClient.getTopics();
      setNotify({
        status: "success",
        title: "Data fetched",
        description: \`Successfully fetched \${his.nodes?.length || 0} msgs history\`,
      });
    } catch (e) {
      setNotify({
        status: "error",
        title: \`Data fetched Failed\`,
        description: \`Failed fetched user data\`,
      });
      console.log(e);
    }
  };
  return (
    <>
      <div>Connected Dapp: ${notifiInfo.appAddress}</div>
      <div>Card ID: ${notifiInfo.cardId}</div>
      {notifiInfo.appAddress && notifiInfo.cardId && (
        <>
          <div>Subscribed alters: {(userData.alerts || []).length}</div>

          <div>Inbox messages: {(userMsgs.nodes || []).length}</div>
          <button className="btn" onClick={handleLogin}>
            LOGIN
          </button>
          <button className="btn" onClick={notifiClient.logOut}>
            LOGOUT
          </button>
          <button className="btn" onClick={test}>
            FetchData
          </button>
        </>
      )}
    </>
  );
};

export default User;

`;
