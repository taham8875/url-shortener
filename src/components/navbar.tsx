import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

const Navbar = () => {
  const session = useSession();
  const user = session.data?.user;
  const isLoading = session.status === "loading";

  return (
    <nav className="border-b-0.5 border-slate-600">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="ml-2 text-2xl font-bold">URL Shortener</h1>
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <p className="mr-2 text-gray-100">
                <CgSpinner className="h-6 w-6 animate-spin" />
              </p>
            ) : user ? (
              <div className="flex items-center">
                <p className="mr-14 text-gray-100">{user.name}</p>
                <button
                  className="flex items-center text-gray-100 hover:text-gray-300"
                  onClick={() => void signOut()}
                >
                  Sign out <IoLogOutOutline className="ms-2 h-6 w-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => void signIn()}
                className="flex items-center text-gray-100 hover:text-gray-300"
              >
                Sign in with <AiFillGithub className="ms-2 h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
