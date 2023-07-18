import Link from "next/link";
import { api } from "~/utils/api";

const RecentUrls = () => {
  const { isLoading, isError, data, hasNextPage, fetchNextPage } =
    api.shortenedUrl.getShortenedUrl.useInfiniteQuery(
      {},
      { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

  const urls = data?.pages.flatMap((page) => page.urls);

  console.log("urls", urls);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent URLs</h2>
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load More
        </button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          urls?.map((url) => (
            <div
              key={url.id}
              className="flex items-center justify-between border-b border-slate-600 px-4 py-6"
            >
              <div className="text-gray-400">{url.original}</div>
              <a
                target="_blank"
                href={`http://localhost:3000/${url.slug}`}
                className="text-blue-500"
              >
                {`http://localhost:3000/${url.slug}`}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentUrls;
