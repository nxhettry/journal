import { IoIosAddCircle } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
      <Link
        href="/transaction/add"
        className="w-4/5 min-h-1/5 md:w-4/5 lg:w-2/5 bg-black text-white rounded-lg p-6 shadow-md flex justify-center items-center"
      >
        <IoIosAddCircle className="text-4xl text-white" />
        <p className="text-lg">Add Record</p>
      </Link>
      <Link
        href="transaction"
        className="w-4/5 min-h-1/5 md:w-4/5 lg:w-2/5 bg-black text-white rounded-lg p-6 shadow-md flex justify-center items-center"
      >
        <FaHistory className="text-4xl text-white" />
        <p className="text-lg">View Trades</p>
      </Link>
    </div>
  );
};

export default Dashboard;
