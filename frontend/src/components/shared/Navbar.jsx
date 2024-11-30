import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Laptop,
  ShieldQuestion,
  Menu,
  LogOutIcon,
  SearchIcon,
  Home,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

// ... (rest of the code remains the same)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout Handler

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Session expired. Please Login");

        dispatch(setUser(null));
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  const GuestMenu = () => (
    <div className="p-2">
      <ul className="flex-col mt-3">
        <Link to="/">
          <li className="lg:hidden flex gap-3 mb-2 font-bold cursor-pointer hover:underline">
            <Home />
            Home
          </li>
        </Link>
        <Link to="/jobs">
          <li className="lg:hidden flex gap-3 mb-2 font-bold cursor-pointer hover:underline">
            <Laptop />
            Jobs
          </li>
        </Link>
        <Link to="/browse">
          <li className="lg:hidden flex gap-3 mb-2 font-bold cursor-pointer hover:underline">
            <SearchIcon />
            Browse
          </li>
        </Link>
      </ul>
      <Link to="/login">
        <Button
          variant="outline"
          className="w-40 font-bold text-sm mx-1 my-2 hover:text-xl hover:text-[#F83002] active:text-[#00aaee]"
        >
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="w-40 mx-1 lg:my-4 my-2 bg-blue-600 text-white rounded-md">
          Signup
        </Button>
      </Link>
    </div>
  );

  const UserMenu = () => (
    <div className="m-3">
      <div className="flex gap-3 lg:gap-4">
        <Avatar className="h-14 w-14 my-3 lg:h-16 lg:w-16 cursor-pointer flex items-center justify-center">
          <AvatarImage
            src={user?.profile?.profilePhoto}
            alt="profile Photo"
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-cols mt-2">
          <h4 className="text-sm font-bold capitalize">{user?.fullname}</h4>
          <p className="text-xs lg:text-sm text-muted-foreground font-bold">
            {user?.profile?.bio}
          </p>
          {user && (
            <p className="text-sm lg:text-sm text-blue-600 cursor-pointer font-bold my-2 lg:my-3 hover:underline active:text-[#F83002]">
              <Link to="/profile">View Profile</Link>
            </p>
          )}
          <hr className="h-px bg-gray-500 border-0 dark:bg-gray-700" />
        </div>
      </div>
      <ul className="flex-col mt-3">
        {user.workstatus === "recruiter" ? (
          <>
            <Link to={"/"}>
              <li className="lg:hidden flex gap-3 mb-2 font-bold cursor-pointer hover:underline">
                <Home />
                Home
              </li>
            </Link>
            <Link to={"/admin/companies"}>
              <li className="flex gap-3 mb-2 font-bold cursor-pointer hover:underline lg:hidden">
                <SearchIcon />
                Companies
              </li>
            </Link>
            <Link to={"/admin/Jobs"}>
              <li className="flex gap-3 mb-2 font-bold cursor-pointer hover:underline lg:hidden">
                <Laptop />
                Jobs
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"}>
              <li className="lg:hidden flex gap-3 mb-2 font-bold cursor-pointer hover:underline">
                <Home />
                Home
              </li>
            </Link>
            <Link to={"/jobs"}>
              <li className="flex gap-3 mb-2 font-bold cursor-pointer hover:underline lg:hidden">
                <Laptop />
                Jobs
              </li>
            </Link>
            <Link to={"/browse"}>
              <li className="flex gap-3 mb-2 font-bold cursor-pointer hover:underline lg:hidden">
                <SearchIcon />
                Browse Jobs
              </li>
            </Link>
          </>
        )}
        <li
          className="flex gap-3 mb-2 font-bold cursor-pointer hover:underline"
          onClick={logoutHandler}
        >
          <LogOutIcon />
          Logout
        </li>
      </ul>
    </div>
  );

  return (
    <div className="top-full w-full bg-white border border-gray-200 shadow-lg rounded-lg z-50">
      <div className="flex items-center justify-between mx-auto max-w-[90%] lg:max-w-auto relative">
        <h1 className="text-3xl lg:text-3xl font-bold ml-4 lg:ml-6 my-6">
          <Link to={"/"}>
            Job<span className="text-blue-600">HUNT</span>
          </Link>
        </h1>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden relative">
          <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
              {user ? <UserMenu /> : <GuestMenu />}
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center gap-4 lg:gap-1">
          <ul className="flex items-center text-base lg:text-lg gap-2 lg:gap-5 font-bold">
            {user && user.workstatus === "recruiter" ? (
              <>
                <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
                  <Link to="/"> Home</Link>
                </li>
                <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="mx-3 hover:underline cursor-pointer hover:text-blue-600 active:text-[#1F51FF]">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" className="font-bold text-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="my-4 w-full py-2 bg-blue-600 text-white rounded-md">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8 lg:h-10 lg:w-10">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile Photo"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 lg:w-80">
                <UserMenu />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Overlay to close the menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
