"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useTheme } from "../ThemeProvider";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
});

const webRoutes = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Services",
    path: "/services",
  },
  {
    id: 3,
    name: "Gallery",
    path: "/gallery",
  },
  {
    id: 4,
    name: "About",
    path: "/about",
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

const mobRoutes = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Services",
    path: "/services",
  },
  {
    id: 3,
    name: "Gallery",
    path: "/gallery",
  },
  {
    id: 4,
    name: "About",
    path: "/about",
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    setShowMobMenu(!showMobMenu);
  };

  return (
    <>
      <div
        className={` fixed  top-0 z-10 bg-white dark:bg-black text-black transition-colors duration-200 dark:text-white backdrop-filter backdrop-blur-lg w-full h-20 lg:px-28 flex justify-between items-center ${playfair_display?.className}`}
      >
        <div className="p-4 ml-4 lg:p-0 lg:ml-0">Pinnacle Events</div>
        <div className=" hidden lg:flex lg:justify-between lg:items-center">
          {webRoutes.map((nav) => {
            return (
              <Link href={nav.path} key={nav.id}>
              <div
                className={`ml-8 text-xl cursor-pointer font-medium relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] dark:after:bg-white after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ${pathname === nav.path && 'after:scale-x-100'}`}
              >
                {nav.name}
              </div>
              </Link>
            );
          })}
          {/* <button onClick={toggleTheme} className="ml-8 text-xl px-2 py-1 bg-gray-800 dark:bg-slate-50 rounded-md">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className=" text-white dark:text-black" />
          </button> */}
        </div>

        <button onClick={toggleTheme} className="ml-8 text-2xl mb-2 lg:mb-0 lg:text-3xl mr-20 mt-2 px-2 py-1 bg-gray-800 dark:bg-slate-50 rounded-md">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size='lg' className=" text-white dark:text-black" />
          </button>
          <FontAwesomeIcon
          onClick={() => handleToggle()}
          icon={faBars} size='2xl' className="fixed z-30 flex items-center cursor-pointer right-10 top-6 lg:hidden" />


          
        {/* {showMobMenu ? (
          
        ) : (
          
        )} */}

        <div
          className={` top-0 right-0 w-8/12 sm:w-6/12 bg-black bg-opacity-90  p-10 pl-20 text-white fixed h-screen z-40 lg:hidden  ease-in-out duration-300 ${
            showMobMenu ? "translate-x-0 " : "translate-x-full"
          }`}
        >
            
          <div className="py-8 flex flex-col items-end justify-start">
          <button
            className="flex text-4xl m-4 text-white items-center cursor-pointer"
            onClick={() => handleToggle()}
          >
            x
          </button>
          {
            mobRoutes.map(item => (
                <Link href={item.path} onClick={() => handleToggle()} key={item.id} className="m-4 text-xl sm:text-2xl text-right font-medium text-white">
                    {item.name}
                </Link>
            ))
          }
          {/* <button onClick={toggleTheme} className="ml-8 text-4xl mr-4 mt-2 px-2 py-1 bg-gray-800 dark:bg-slate-50 rounded-md">
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className=" text-white dark:text-black" />
          </button> */}
          </div>
          
          {/* <h3 className="mt-20 text-4xl font-semibold text-white">
            I am a sidebar
          </h3> */}
        </div>

        {/* {
                    showMobMenu &&
                    <div className=" absolute w-8/12 sm:w-8/12 md:w-6/12 bg-slate-500 right-0 top-0 h-screen lg:hidden">
                        <div onClick={() => handleToggle()}>X</div>
                    {
                        mobRoutes.map(nav => {
                            return(
                                <div key={nav.id}>{nav.name}</div>
                            )
                        })
                    }
                </div>} */}
      </div>
    </>
  );
}
