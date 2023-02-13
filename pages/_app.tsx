import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../hooks";
import Head from "next/head";
import Header from "../components/layout/Header";
import Notify from "../components/common/Notify";
import Loading from "../components/common/Loading";
import "@notifi-network/notifi-react-card/dist/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossOrigin="anonymous"
        />
        <title>Notifi Playground</title>
      </Head>

      <AppContext>
        <Notify />
        <Loading />
        <Header />
        <Component {...pageProps} />
      </AppContext>
    </>
  );
}

export default MyApp;
