import Head from "next/head";
import Navbar from "~/components/navbar";
import MainHeading from "~/components/main-heading";
import ShortenForm from "~/components/shorten-form";

export default function Home() {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URl shortener created by t3 stack" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="  text-gray-100">
        <Navbar />
        <div className="container mx-auto">
          <MainHeading />
          <ShortenForm />
        </div>
      </div>
    </>
  );
}
