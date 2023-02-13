import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../hooks";
import Head from "next/head";
import Header from "../components/layout/Header";
import Notify from "../components/common/Notify";
import Loading from "../components/common/Loading";
import "@notifi-network/notifi-react-card/dist/index.css";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notifi Solana Playground</title>
      </Head>

      <AppContext>
        <Notify />
        <Loading />
        <Header />
        <Component {...pageProps} />
      </AppContext>
    </>
  );
};

export default MyApp;
