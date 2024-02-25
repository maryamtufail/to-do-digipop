import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const metadata = {
    title: "Your App Title",
    description: "Your app description",
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
