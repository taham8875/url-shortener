import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URl shortener created by t3 stack" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      hi
    </>
  );
}
