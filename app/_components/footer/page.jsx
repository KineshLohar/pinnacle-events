import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import nextJsLogo from '../../../public/static/images/nextjslogo.svg'

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

const Footer = () => {
  return (
    <footer className=" bg-slate-200 text-center text-surface/75  lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-b-slate-300 p-6  lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="flex justify-center">
        {socials.map((social) => (      
                            <Link key={social.id} href={social.path} legacyBehavior className="">                      
                                {/* <FontAwesomeIcon icon={social.icon} height='2rem' /> */}
                                <SocialIcon url={social.path} className="mr-4 " bgColor='black' style={{height : '2rem', width : '2rem'}} />
                            </Link>
                        ))}
        </div>
      </div>

      <div className="mx-6 py-10 text-center  md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-bold md:justify-start">
              <span className="me-3 [&>svg]:h-4 [&>svg]:w-4">
                LOGO
              </span>
              PINNACLE EVENTS
            </h6>
            <p>
            Pinnacle Events is a one-stop destination for unforgettable events.
                    Whether you are looking for a place to stay, a place to eat, or a
                    place to dine, Pinnacle Events is the place to find the perfect venue
                    for you.
            </p>
            <p>GSTIN : 1234567890</p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <Link href="#!">Home</Link>
            </p>
            <p className="mb-4">
              <Link href="#!">Services</Link>
            </p>
            <p className="mb-4">
              <Link href="#!">Testimonails</Link>
            </p>
            <p className="mb-4">
              <Link href="#clients">About</Link>
            </p>
            <p>
              <Link href="#!">Contact</Link>
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center font-bold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
              <FontAwesomeIcon icon={faHouse} />
              </span>
              481/2 Ahmedabad Gujarat 382481
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
            <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
            <FontAwesomeIcon icon={faEnvelope} />
            </span>
             ravi130489@gmail.com
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
              <FontAwesomeIcon icon={faPhone} />
              </span>
              08200693373
            </p>
            {/* <p className="flex items-center justify-center md:justify-start">
              <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5zM15 9.75a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75H15z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              + 01 234 567 89
            </p> */}
          </div>
        </div>
      </div>

      <div className="bg-black/5 p-6 italic text-center flex items-center justify-center">
        <span>© 2023 Copyright:</span>
        <a className="font-semibold" href="https://tw-elements.com/">
          Pinnacle Events 
        </a>
        <span className="ml-2 flex items-center justify-center ">Developed using <Image src={nextJsLogo} height={50} width={50} className="mx-2" /> by @Kinesh Lohar</span>
      </div>
    
    </footer>
  );
};

export default Footer;
