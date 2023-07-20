import { TbError404 } from "react-icons/tb";

const Page404 = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <TbError404 className="h-20 w-20  text-gray-400" />
        <p className="mt-4 text-gray-400">
          The page you are looking for does not exist
        </p>
      </div>
    </div>
  );
};

export default Page404;
