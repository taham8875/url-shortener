import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
const AskToLogin = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold">
          Want to use our service? Please login first
        </p>
        <button
          onClick={() => void signIn()}
          className="flex items-center rounded-xl border-2 border-gray-500 px-7 py-3 text-gray-100 transition-all hover:border-gray-600 hover:text-gray-300"
        >
          Sign in with <AiFillGithub className="ms-2 h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AskToLogin;
