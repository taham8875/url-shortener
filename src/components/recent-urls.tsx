import { api } from "~/utils/api";
import { AiFillEye } from "react-icons/ai";
import { PiLinkLight, PiSpinnerGapBold } from "react-icons/pi";

const RecentUrls = () => {
  const { isLoading, isError, data, hasNextPage, fetchNextPage } =
    api.shortenedUrl.getShortenedUrls.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const urls = data?.pages.flatMap((page) => page.urls);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent URLs</h2>
        <button
          className="text-blue-500 hover:cursor-pointer hover:text-blue-600 disabled:cursor-default disabled:text-gray-500"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load More
        </button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <PiSpinnerGapBold className="h-16 w-16 animate-spin text-gray-400" />
          </div>
        ) : isError ? (
          <div>Error</div>
        ) : urls === undefined || urls.length == 0 ? (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
              <PiLinkLight className="h-16 w-16 text-gray-500" />
              <p className="text-2xl font-bold">
                No urls found, Create your first url
              </p>
            </div>
          </div>
        ) : (
          urls?.map((url) => (
            <div
              key={url.id}
              className="flex items-center justify-between border-b border-slate-600 px-4 py-6"
            >
              <div className="flex-1">
                <a
                  target="_blank"
                  href={url.original}
                  className="font-mono text-gray-400"
                >
                  {url.original}
                </a>
              </div>
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_ROOT_URL}/${url.slug}`}
                className="font-mono text-blue-500"
              >
                {`${process.env.NEXT_PUBLIC_ROOT_URL}/${url.slug}`}
              </a>
              <div className="ml-10 flex gap-3 font-mono text-gray-400">
                <AiFillEye className="h-6 w-6" />
                {url.clicks}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUrls;
