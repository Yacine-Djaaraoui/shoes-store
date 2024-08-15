import { Link } from "react-router-dom";
import useLogout from "../hooks/logout";

const Sidebar = () => {
  const logout = useLogout();

  return (
    <div className="flex flex-wrap min-h-[600px] py-6 w-full  items-start  max-w-[250px] bg-primary-color-100 font-semibold">
      <div className="w-full">
        <Link to={"addproduct"} className="w-full">
          <button className="text-white hover:bg-white mb-6  hover:text-button-color-100 border-y border-y-white  w-full  px-3 py-2">
            Add Product
          </button>
        </Link>
        <Link to={"listproduct"} className="w-full ">
          <button className="text-white  hover:bg-white hover:text-button-color-100 border-y border-y-white  w-full  px-3 py-2">
            Product List
          </button>
        </Link>
      </div>

      <button
        className="text-white  self-end hover:bg-white hover:text-button-color-100   w-full  px-3 py-2 bg-beje"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
