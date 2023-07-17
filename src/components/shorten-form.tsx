import { GetServerSideProps } from "next";

const ShortenForm = () => {
  return (
    <div className="flex items-center justify-center">
      <form className="flex items-center justify-center rounded-l-lg ">
        <input
          type="text"
          className="w-96 rounded-l-lg bg-slate-950 px-4 py-2  ring-2 ring-slate-700 focus:outline-none"
          placeholder="Enter your long URL"
        />
        <button
          type="submit"
          className="rounded-r-lg bg-blue-500 px-4 py-2 text-white ring-2 ring-slate-700 hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>
    </div>
  );
};

export default ShortenForm;
