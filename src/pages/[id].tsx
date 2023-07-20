import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";
import { PiSpinnerGapBold } from "react-icons/pi";
import Page404 from "~/components/page-404";

export default function Page() {
  const utils = api.useContext();
  const router = useRouter();

  const { id } = router.query as { id: string };

  console.log("id", id);

  const {
    data: originalUrl,
    isLoading,
    isError,
  } = api.shortenedUrl.getOriginalUrl.useQuery({ slug: id });

  useEffect(() => {
    if (originalUrl) {
      utils.shortenedUrl.getShortenedUrls.invalidate();
      router.push(originalUrl);
    }
  }, [originalUrl]);

  if (originalUrl === null) {
    return <Page404 />;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <PiSpinnerGapBold className="h-20 w-20 animate-spin text-gray-400" />
          <p className="mt-4 text-gray-400">
            Redirecting you to the original URL, it may take a few seconds...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }
}
