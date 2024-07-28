"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';

import { Playfair_Display } from "next/font/google";
import Link from "next/link";

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
    name: "Testimonials",
    path: "/testimonials",
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

  const handleToggle = () => {
    setShowMobMenu(!showMobMenu);
  };

  return (
    <>
      <div
        className={` fixed  top-0 z-10 bg-black text-white backdrop-filter backdrop-blur-lg bg-opacity-30 w-full h-20 lg:px-28 flex justify-between items-center ${playfair_display?.className}`}
      >
        <div className="p-4 ml-4 lg:p-0 lg:ml-0">Pinnacle Events</div>
        <div className=" hidden lg:flex lg:justify-between lg:items-center">
          {webRoutes.map((nav) => {
            return (
              <Link href={nav.path} key={nav.id}>
              <div
                className={`ml-8 text-xl cursor-pointer relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ${pathname === nav.path && 'after:scale-x-100'}`}
              >
                {nav.name}
              </div>
              </Link>
            );
          })}
        </div>
        {/* <button onClick={() => handleToggle()} className=" p-4 lg:hidden">
          burger
        </button> */}

        <svg
            onClick={() => handleToggle()}
            className="fixed  z-30 flex items-center cursor-pointer right-10 top-6 lg:hidden"
            fill="#fff"
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>

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
                <div key={item.id} className="m-4 text-xl sm:text-2xl text-right font-medium text-white">
                    {item.name}
                </div>
            ))
          }
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
