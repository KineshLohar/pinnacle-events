import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import carImage from '../../../public/static/images/car.jpg';
import bgImage from '../../../public/static/images/bg-hero1.jpg'
import Image from "next/image";
import { SocialIcon } from 'react-social-icons'
import { socials } from "@/app/Socials";


const Hero = () => {

    return (
        <div className="flex flex-col justify-center items-center bg-cover bg-center pt-[5rem] p-8 pb-12 w-full lg:flex-row lg:min-h-[100vh] lg:px-28  " 
        style={{backgroundImage : `url(${bgImage.src})`}}
        >
            <div className="flex flex-col text-center pt-12 lg:pt-0 lg:text-left lg:items-center lg:justify-center lg:h-[70vh]">
                <h1 className=" text-3xl text-center font-bold lg:text-4xl xl:text-5xl text-white">
                    Pinnacle Events - Your One-Stop Destination for Unforgettable Events
                </h1>
                <p className="relative text-lg my-4 font-serif opacity-95 lg:mr-4 text-white text-center">
                    Pinnacle Events is a one-stop destination for unforgettable events.
                    Whether you are looking for a place to stay, a place to eat, or a
                    place to dine, Pinnacle Events is the place to find the perfect venue
                    for you.
                    <span className="absolute -inset-3 bg-black bg-opacity-50 blur-lg rounded-lg -z-10"></span>
                </p>
                <div className="flex flex-col justify-center items-center lg:w-full lg:items-center">
                    <div className="flex justify-around flex-wrap w-full lg:justify-center lg:items-center">
                        {socials.map((social) => (      
                            <Link key={social.id} href={social.path} legacyBehavior className="">                      
                                {/* <FontAwesomeIcon icon={social.icon} height='2rem' /> */}
                                <SocialIcon url={social.path} className="mr-4" style={{height : '2rem', width : '2rem'}} />
                            </Link>
                        ))}
                    </div>
                    <button href="#_" className="relative inline-flex items-center justify-start inline-block my-8 px-5 py-3 overflow-hidden font-bold rounded-lg group bg-blue-700">
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">GET IN TOUCH!</span>
                        <span className="absolute inset-0 border-2 border-white rounded-lg"></span>
                    </button>
                    {/* <button className=" bg-blue-600 my-8 px-8 py-4 text-white font-bold rounded-lg font-serif lg:m-0 lg:mt-4">
                        GET IN TOUCH!
                    </button> */}
                </div>
            </div>
            {/* <div className="lg:w-6/12 lg:h-[70vh] lg:py-4 lg:flex lg:items-center lg:justify-center">
                <Image 
                src={carImage}
                alt="hero Image"
                className=" object-cover m-auto rounded-md shadow-[0_8px_30px_rgb(256,256,256,0.15)]"
                />
                
            </div> */}
        </div>
    );
};

export default Hero;
