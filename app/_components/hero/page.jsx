import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import carImage from '../../../public/static/images/car.jpg';
import Image from "next/image";
import { SocialIcon } from 'react-social-icons'

const socials = [
    {
        id: 1,
        name: "Facebook",
        path: "https://www.facebook.com/pinnacle.events/",
        icon: 'fa-brands fa-facebook',
        color : "#0355e2"
    },
    {
        id: 2,
        name: "Instagram",
        path: "https://www.instagram.com/pinnacle.events/",
        icon: 'fa-brands fa-instagram',
        color : "#0355e2"
    },
    {
        id: 3,
        name: "LinkedIn",
        path: "https://www.linkedin.com/company/pinnacle-events/",
        icon: 'fa-brands fa-linkedin',
    },
    {
        id: 4,
        name: "Twitter",
        path: "https://twitter.com/pinnacle_events",
        icon: 'fa-brands fa-twitter',
        color : "#0355e2"
    },
    {
        id: 5,
        name: "YouTube",
        path: "https://www.youtube.com/channel/UC-99999999",
        icon: 'fa-brands fa-youtube',
        color : "#0355e2"
    }
];

const Hero = () => {

    return (
        <div className="flex flex-col justify-center items-center pt-[5rem] p-8 pb-12 w-full lg:flex-row lg:h-[100vh] lg:px-28">
            <div className="flex flex-col text-center pt-12 lg:pt-0 lg:w-6/12 lg:text-left lg:items-start lg:justify-center lg:h-[70vh]">
                <h1 className=" text-3xl font-bold lg:text-6xl">
                    Pinnacle Events - Your One-Stop Destination for Unforgettable Events
                </h1>
                <p className=" text-lg my-4 font-serif opacity-70 lg:mr-4">
                    Pinnacle Events is a one-stop destination for unforgettable events.
                    Whether you are looking for a place to stay, a place to eat, or a
                    place to dine, Pinnacle Events is the place to find the perfect venue
                    for you.
                </p>
                <div className="flex flex-col justify-center items-center lg:w-full lg:items-start">
                    <div className="flex justify-around flex-wrap w-full lg:justify-start lg:items-center">
                        {socials.map((social) => (      
                            <Link key={social.id} href={social.path} legacyBehavior className="">                      
                                {/* <FontAwesomeIcon icon={social.icon} height='2rem' /> */}
                                <SocialIcon url={social.path} className="mr-4" style={{height : '2rem', width : '2rem'}} />
                            </Link>
                        ))}
                    </div>
                    <button className=" bg-blue-600 my-8 px-8 py-4 text-white font-medium rounded-lg font-serif lg:m-0 lg:mt-4">
                        Let's Connect
                    </button>
                </div>
            </div>
            <div className="lg:w-6/12 lg:h-[70vh] lg:py-4 lg:flex lg:items-center lg:justify-center">
                <Image 
                src={carImage}
                alt="hero Image"
                className=" object-cover m-auto rounded-md"
                />
                
            </div>
        </div>
    );
};

export default Hero;
