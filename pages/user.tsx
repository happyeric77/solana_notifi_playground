import { FC, useMemo, useState } from "react";
import { SignMessageParams, useNotifiClient } from "@notifi-network/notifi-react-hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNotifiInfo } from "../hooks/useNotifiInfo";
import { useNotify } from "../hooks/useNotify";
import CodeEditor from "../components/common/CodeEditer";
import { codeUserData, step1code } from "../utils/constant";
import style from "../styles/adminAndUser.module.sass";

interface IUserData {
  alerts: {
    id: string | null;
    name: string | null;
    filter: {
      id: string | null;
      name: string | null;
      filterType: string;
    };
    filterOptions: string | null;
    sourceGroup: any;
    targetGroup: any;
    groupName: string | null;
  }[];
}
type IUserMsgs = Readonly<{
  nodes?:
    | Readonly<{
        __typename?: "NotificationHistoryEntry" | undefined;
        id: string;
        createdDate: string;
        detail?:
          | {
              __typename: "AccountBalanceChangedEventDetails";
            }
          | {
              __typename: "BroadcastMessageEventDetails";
              type: string;
              subject?: string | undefined;
              message?: string | undefined;
            }
          | {
              __typename: "ChatMessageReceivedEventDetails";
            }
          | {
              __typename: "DAOProposalChangedEventDetails";
            }
          | {
              __typename: "DirectTenantMessageEventDetails";
            }
          | {
              __typename: "GenericEventDetails";
            }
          | {
              __typename: "HealthValueOverThresholdEventDetails";
              name: string;
              value: string;
              threshold: string;
            }
          | {
              __typename: "NftAuctionChangedEventDetails";
            }
          | {
              __typename: "NftCollectionsReportEventDetails";
            }
          | {
              __typename: "WalletsActivityReportEventDetails";
            }
          | undefined;
      }>[]
    | undefined;
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | undefined;
  };
}>;
const User: FC = () => {
  const wallet = useWallet();
  const { setNotify } = useNotify();
  const { notifiInfo, setNotifiInfo } = useNotifiInfo();
  const notifiClient = useNotifiClient({
    dappAddress: notifiInfo.appAddress,
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
    try {
      await notifiClient.logIn(signer);
      setNotify({
        status: "success",
        title: `Login Done`,
        description: `Successfully logged in`,
      });
    } catch (e) {
      setNotify({
        status: "error",
        title: `Login failed`,
        description: `Failed to log in ${e}`,
      });
    }
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
        title: `Data fetched`,
        description: `Successfully fetched ${his.nodes?.length || 0} msgs history`,
      });
    } catch (e) {
      setNotify({
        status: "error",
        title: `Data fetched Failed`,
        description: `Failed fetched user data`,
      });
      console.log(e);
    }
  };
  return (
    <>
      <div className={style.user}>
        <div style={{ fontSize: "2rem" }}>User case #1: Create NotifiCard by @notifi-network/notifi-react-card</div>
        <div>Test appAddress: colorfullife </div>
        <div>Test cardId: 51fd3e3da1104f15abe4e1f8df46747e</div>
        <div className={style.inputs}>
          <input
            type={"text"}
            onChange={(evt) => setNotifiInfo((old) => ({ ...old, appAddress: evt.target.value }))}
            value={notifiInfo.appAddress}
            placeholder="App address"
          />
          <input
            type={"text"}
            onChange={(evt) => setNotifiInfo((old) => ({ ...old, cardId: evt.target.value }))}
            value={notifiInfo.cardId}
            placeholder="Card ID"
          />
        </div>
        <CodeEditor value={step1code(notifiInfo)} />
        <div style={{ fontSize: "2rem" }}>
          User case #2: Manipulate subscribed user data in deep by @notifi-network/notifi-react-hook
        </div>
        <div>Connected Dapp: {notifiInfo.appAddress}</div>
        <div>Card ID: {notifiInfo.cardId}</div>
        <CodeEditor value={codeUserData(notifiInfo)} />
        {notifiInfo.appAddress && notifiInfo.cardId && (
          <>
            <div>Subscribed alters: {(userData.alerts || []).length}</div>

            <div>Inbox messages: {(userMsgs.nodes || []).length}</div>
            <div className={style.btns}>
              <button className="btn" onClick={handleLogin}>
                LOGIN
              </button>
              <button className="btn" onClick={test}>
                FetchData
              </button>
              <button className="btn" onClick={notifiClient.logOut}>
                LOGOUT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default User;
