/* eslint-disable @next/next/no-img-element */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import * as React from "react";
import CategoriesInput from "./CategoriesInput";
import NavModal from "../NaVModal/NavModal";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import Logo from "/public/assets/cityshoppa.png";
import Profile from "../modals/profileModal";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userSignup, setUserSignup] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const styles = {
    activeButton: {
      background:
        "radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #30336b",
      width: "6rem",
      height: "2.5rem",
      borderRadius: "3rem",
      border: "none",
      padding: "0.rem 1.7rem",
      fontSize: "0.7rem",
      lineHeight: "1.5rem",
      textAlign: "center",
      color: "#fff",
      marginRight: "1rem",
      cursor: "pointer",
      "&:hover": {
        background:
          "radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), #30336b",
        width: "6rem",
        height: "2.5rem",
        borderRadius: "3rem",
        border: "none",
        padding: "0.rem 1.7rem",
        fontSize: "0.7rem",
        lineHeight: "1.5rem",
        textAlign: "center",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  };
  return (
    <Disclosure as="header" className="bg-[#FF7235]">
      {({ open }) => (
        <>
        {showProfile && <Profile open={showProfile} setOpen={setShowProfile} />}
          <div className="max-w-7x1 mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    className="block lg:hidden h-8 w-auto"
                    src={Logo}
                    alt="hero"
                  />
                  <Image
                    className="hidden lg:block h-8 w-auto"
                    src={Logo}
                    alt="hero"
                  />
                </div>
              </div>
              <div className="relative z-0 flex-1 px-2 mr-8 md:flex hidden items-center justify-center sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchOutlinedIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <WhereToVoteIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <select
                      id="location"
                      name="location"
                      className="block w-full bg-white-700 ml-1 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm "
                      defaultValue="Canada"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open menu</span>
                  {<NavModal />}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg: mr-11 lg:flex lg:items-center">
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#fff",
                      ml: 1.5,
                    }}
                  >
                    <FavoriteBorderIcon
                      sx={{ fontSize: "22px", mr: 0.5, mb: -1 }}
                    />
                    <Typography
                      sx={{
                        fontSize: "22px",
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: -1,
                      }}
                    >
                      $500
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Donated To Charity
                  </Typography>
                </Box>

                {/* Profile dropdown */}
                {userSignup ? (
                  <Menu as="div" className="flex-shrink-0 relative ml-4">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <AddShoppingCartIcon
                        sx={{
                          fontSize: "30px",
                          color: "#fff",
                          ml: 1,
                        }}
                        aria-hidden="true"
                      />
                    </button>
                    <div>
                      <Menu.Button 
                      // onClick={() => setShowProfile(true)}
                      className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                  </Menu>
                ) : (
                  <Box sx={{ ml: 2 }}>
                    <Button
                      type="button"
                      variant="contained"
                      sx={styles.activeButton}
                    >
                      Sign in
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      sx={styles.activeButton}
                    >
                      Sign up
                    </Button>
                  </Box>
                )}
              </div>
            </div>
            <nav
              className=" lg:p-2 align-middle md:hidden flex lg:space-x-8 py-2 mt-0 "
              aria-label="Global"
            >
              <div>
                <div className="mt-0 mr-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm py-1.5 px-2 mr-12 bg-white text-sm text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                    placeholder="Find Local Services & Products"
                  />
                </div>
              </div>
              <CategoriesInput />
            </nav>
          </div>
        </>
      )}
    </Disclosure>
  );
}
