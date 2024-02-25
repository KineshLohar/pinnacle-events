'use client'
import { useState } from "react"

import { Playfair_Display } from 'next/font/google'

const playfair_display = Playfair_Display({ subsets: ['latin'], weight: '500' })

const webRoutes = [
    {
        id : 1,
        name: "Home",
        path: "/"
    },
    {
        id : 2,
        name : "Services",
        path : "/services"
    },
    {
        id : 3,
        name : "Testimonials",
        path : "/testimonials"
    },
    {
      id : 4,
      name : "About",
      path : "/about"
    },
    {
      id : 5,
      name : "Contact",
      path : "/contact"
    },

]

const mobRoutes = [
    {
        id : 1,
        name: "Home",
        path: "/"
    },
    {
      id : 2,
      name : "Services",
      path : "/services"
    },
    {
        id : 3,
        name : "Testimonials",
        path : "/testimonials"
    },
    {
        id : 4,
        name : "About",
        path : "/about"
    },
    {
        id : 5,
        name : "Contact",
        path : "/contact"
    },

]

export default function Navbar(){

    const [showMobMenu, setShowMobMenu] = useState(false)

    return (
        <>
            <div className={` absolute  top-0 z-10 bg-slate-200 backdrop-filter backdrop-blur-lg bg-opacity-30 w-full h-20 lg:px-28 flex justify-between items-center ${playfair_display?.className}`}>
                <div className="p-4 ml-4 lg:p-0 lg:ml-0">
                    Pinnacle Events
                </div>
                <div className=" hidden lg:flex lg:justify-between lg:items-center">
                    {
                        webRoutes.map(nav => {
                            return(
                                <div className="ml-8 text-xl cursor-pointer" key={nav.id}>{nav.name}</div>
                            )
                        })
                    }
                </div>
                <button onClick={() => setShowMobMenu(prev => !prev)} className=" p-4 lg:hidden">burger</button>
                {
                    showMobMenu &&
                    <div className=" absolute w-8/12 sm:w-6/12 md:w-4/12 bg-slate-500 right-0 top-0 h-full lg:hidden">
                        <div onClick={() => setShowMobMenu(prev => !prev)}>X</div>
                    {
                        mobRoutes.map(nav => {
                            return(
                                <div key={nav.id}>{nav.name}</div>
                            )
                        })
                    }
                </div>}
            </div>
        </>
    )
}