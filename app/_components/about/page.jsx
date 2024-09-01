import Link from "next/link";
import carImage from "../../../public/static/images/car.jpg";
import whoWeAre from '../../../public/static/images/whoweare.jpg'

import Image from "next/image";

const About = () => {
  return (
    <div className="bg-primaryLight dark:bg-primaryDark flex flex-col-reverse justify-center items-center bg-cover bg-center pt-[5rem] p-8 pb-12 w-full lg:flex-row lg:min-h-[100vh] lg:px-28 transition-colors duration-200">
      
      <div className="lg:w-6/12 lg:h-[70vh] lg:py-4 lg:flex lg:items-center lg:justify-center">
        <Image
          src={whoWeAre}
          alt="hero Image"
          className=" object-cover m-auto rounded-md shadow-[0_2px_4px_rgb(0,0,0,0.55)]"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center pt-12 lg:pt-0 lg:pl-20 lg:w-6/12 lg:text-right lg:items-end lg:justify-center lg:h-[70vh]">
        <h1 className=" text-3xl font-bold lg:text-4xl xl:text-6xl text-black dark:text-white">
          Who we are!
        </h1>
        <p className=" text-lg my-8 font-serif opacity-95 text-black dark:text-white">
          Pinnacle Events is a non-profit organization that provides a platform
          for the public to connect with local community events. The events are
          organized by local community groups, and the public can connect with
          the events through the platform.
        </p>
       
        {/* <Link href="#_" className="relative inline-block text-lg mb-8 text-center group w-[12rem]">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-52 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Read More!</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
        </Link> */}
        <Link href="/about" className="relative inline-flex text-lg items-center justify-start inline-block my-8 px-8 py-3 overflow-hidden font-bold rounded-lg group">
            <span className="w-48 h-48 rotate-45 -translate-x-4 -translate-y-10 absolute left-0 top-0 bg-black dark:bg-white opacity-[3%] dark:opacity-95"></span>
            <span className="absolute top-0 left-0 w-60 h-60 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-80 -translate-y-32 bg-black opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Read More!</span>
            <span className="absolute inset-0 border-2 border-black dark:text-white rounded-lg"></span>
        </Link>
      </div>
    </div>
  );
};

export default About;
