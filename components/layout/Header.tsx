import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import style from "../../styles/header.module.sass";
import Image from "next/image";
import { NotifiCard } from "./NotifiCard";
import { FC, useState } from "react";
import { useNotifiInfo } from "../../hooks/useNotifiInfo";

const Header: FC = () => {
  const wallet = useWallet();
  const [showNotifiCard, setShowNotifiCard] = useState<boolean>(false);
  const { notifiInfo } = useNotifiInfo();

  return (
    <>
      <div className={style.header}>
        <Image src="/image/solana.png" width={60} height={60} alt="Solana logo" layout={"fixed"} />
        <Link href="/">ADMIN</Link>
        <Link href="/user">USER Config</Link>
        <div>
          <Image
            src="/image/notifi.svg"
            width={50}
            height={50}
            alt="notifi logo"
            layout={"fixed"}
            onClick={() => {
              setShowNotifiCard((old) => !old);
            }}
          />
          {showNotifiCard && <NotifiCard appAddress={notifiInfo.appAddress} cardId={notifiInfo.cardId} />}
        </div>

        <WalletModalProvider>
          {wallet.connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
        </WalletModalProvider>
      </div>
    </>
  );
};
export default Header;
