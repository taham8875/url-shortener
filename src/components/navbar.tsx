import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b-0.5 border-slate-600">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
            <h1 className="ml-2 text-2xl font-bold">URL Shortener</h1>
          </div>
          <div className="flex items-center">
            <a href="#" className="text-gray-100 hover:text-gray-300">
              Login
            </a>
            <a
              href="#"
              className="ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
