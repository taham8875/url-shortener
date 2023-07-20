import Head from "next/head";
import Navbar from "~/components/navbar";
import MainHeading from "~/components/main-heading";
import ShortenForm from "~/components/shorten-form";
import RecentUrls from "~/components/recent-urls";
import { useSession } from "next-auth/react";
import AskToLogin from "~/components/ask-to-login";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;
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
          {user ? (
            <>
              <ShortenForm />
              <RecentUrls />
            </>
          ) : (
            <AskToLogin />
          )}
        </div>
      </div>
    </>
  );
}
