import { GetServerSideProps } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const ShortenForm = () => {
  const createShortUrl = api.shortenedUrl.create.useMutation();

  const [inputValue, setInputValue] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlRegex.test(inputValue)) {
      setWarningMessage("Please enter a valid URL");
    } else {
      setWarningMessage("");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="flex items-center justify-center rounded-l-lg "
        >
          <input
            type="text"
            className="w-96 rounded-l-lg bg-slate-950 px-4 py-2  ring-2 ring-slate-700 focus:outline-none"
            placeholder="Enter your long URL"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-r-lg bg-blue-500 px-4 py-2 text-white ring-2 ring-slate-700 hover:bg-blue-600"
          >
            Shorten
          </button>
        </form>
      </div>
      {warningMessage && (
        <div className="mt-6 flex justify-center text-red-400">
          {warningMessage}
        </div>
      )}
    </>
  );
};

export default ShortenForm;
