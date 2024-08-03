"use client";
import Image from "next/image";
import car from "../../public/static/images/car.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const services = [
    {
      id: 1,
      number: "01",
      title: "Event Planning and Coordination",
      description: [
        { id: 1, text: "Concept development and theme creation" },
        { id: 2, text: "Budget management and financial planning" },
        { id: 3, text: "Timeline and schedule creation" },
        { id: 4, text: "Vendor coordination and management" }
      ],
      image: car,   
    },
    {
      id: 2,
      number: "02",
      title: "Venue Selection and Management",
      description: [
        { id: 1, text: "Venue research and site visits" },
        { id: 2, text: "Contract negotiation and management" },
        { id: 3, text: "Venue setup and teardown" }
      ],
      image: car,
    },
    {
      id: 3,
      number: "03",
      title: "Catering Services",
      description: [
        { id: 1, text: "Menu planning and customization" },
        { id: 2, text: "Coordination with catering vendors" },
        { id: 3, text: "On-site catering management" }
      ],
      image: car,
    },
    {
      id: 4,
      number: "04",
      title: "Audio-Visual and Technical Support",
      description: [
        { id: 1, text: "AV equipment rental and setup" },
        { id: 2, text: "Lighting and sound design" },
        { id: 3, text: "Technical support during the event" }
      ],
      image: car,
    }
  ];
  

// const services = [
//   {
//     id: 1,
//     number: "01",
//     title: "Talent Acquisition",
//     description:
//       "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
//     image: car,
//   },
//   {
//     id: 2,
//     number: "02",
//     title: "Manpower Sourcing",
//     description:
//       "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
//     image: car,
//   },
//   {
//     id: 3,
//     number: "03",
//     title: "Recruitment Solutions",
//     description:
//       "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
//     image: car,
//   },
// ];

const portfolioServices = [
  { id: 1, title: "Celebration Events" },
  { id: 2, title: "Advertising" },
  { id: 3, title: "Touch Point Brand Activation" },
  { id: 4, title: "Outdoor Strategy & Buying" },
  { id: 5, title: "Experiential Marketing" },
  { id: 6, title: "Trade Marketing" },
  { id: 7, title: "Launch Events" },
  { id: 8, title: "In Store marketing" },
  { id: 9, title: "Media Buying" },
  { id: 10, title: "Retail Fabrication" },
  { id: 11, title: "Digital Advertising" },
  { id: 12, title: "Direct marketing" },
  { id: 13, title: "Loyalty & Rewards Programs" },
  { id: 14, title: "Mobile Marketing" },
  { id: 15, title: "Sales acceleration Programs" },
  { id: 16, title: "School programs" },
  { id: 17, title: "M.I.C.E." },
  { id: 18, title: "College programs" },
  { id: 19, title: "Mall Promotions" },
];

export default function Services() {
  const [showAll, setShowAll] = useState(false);

  // Determine the number of items to show on mobile
  const itemsToShow = 6;
  const mobileItems = showAll
    ? portfolioServices
    : portfolioServices.slice(0, itemsToShow);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="bg-[#1f1f1f] text-white py-24 flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl mt-4 text-center font-serif font-semibold">
        <span className=" opacity-85">Our</span> <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Services</span>
      </h2>
      <div className="p-6 text-lg lg:px-52 lg:text-2xl text-center mt-4 opacity-90">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        eveniet eaque nesciunt impedit, reprehenderit alias quos quaerat eos
        quasi, nostrum sint beatae possimus doloremque consequatur vitae placeat
        perspiciatis voluptas laborum!
      </div>

      {/* Responsive Rendering */}
      <div className="hidden lg:flex flex-wrap px-8 py-4 lg:px-32 md:py-8 items-center justify-center gap-4">
        {portfolioServices.map((item) => {
          const leftBorderColor = getRandomColor();
          const rightBorderColor = getRandomColor();
          return (
            <div
              key={item.id}
              className="text-white text-center text-xs sm:text-base py-3 px-6 bg-[#2c2c2c] rounded-xl hover:scale-105 transition-transform duration-300"
              style={{
                borderLeft: `2px solid ${leftBorderColor}`,
                borderRight: `2px solid ${rightBorderColor}`,
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      <div className="lg:hidden flex flex-wrap px-8 py-4 lg:px-32 md:py-8 items-stretch text-center justify-center gap-4">
        {mobileItems.map((item) => {
          const leftBorderColor = getRandomColor();
          const rightBorderColor = getRandomColor();
          return (
            <div
              key={item.id}
              className={`text-white text-center content-center text-xs sm:text-base py-3 px-6 bg-[#2c2c2c] rounded-xl transition-opacity duration-300 break-words max-w-[10rem] ${
                showAll ? "opacity-100" : "opacity-70"
              }`}
              style={{
                borderLeft: `2px solid ${leftBorderColor}`,
                borderRight: `2px solid ${rightBorderColor}`,
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className=" lg:hidden mt-2 mb-4 flex justify-center">
        {showAll ? (
          <button
            onClick={() => setShowAll(false)}
            className="px-4 py-2 bg-[#2c2c2c] text-white rounded-lg transition-opacity duration-300 hover:opacity-80"
          >
            Show Less
          </button>
        ) : (
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-[#2c2c2c] text-white rounded-lg transition-opacity duration-300 hover:opacity-80"
          >
            Show More
          </button>
        )}
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="500"
        className="flex flex-col items-center justify-center xl:px-20"
      >
        {services.map((item, index) => {
          const flexDirection =
            index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row";
          return (
            <div
              key={item.id}
              className={`bg-[#2c2c2c] rounded-xl flex flex-col m-4 md:m-8 items-stretch justify-evenly ${flexDirection}`}
            >
              <Image
                src={item.image}
                className="rounded-xl lg:w-6/12"
                alt={item.title}
              />
              <div className="lg:w-6/12 p-8 lg:p-16 flex flex-col items-start justify-center gap-6 font-serif">
                <div className="font-bold text-5xl md:text-6xl text-blue-400 font-sans">
                  {item.number}
                </div>
                <div className="text-4xl font-semibold">{item.title}</div>
                {/* <div className="text-justify">{item.description}</div> */}
                <div className="flex flex-col items-start justify-center gap-2">
                    {
                        item.description.map(desc => (
                            <div>
                                <FontAwesomeIcon icon={faForward} className="mr-2" /><span>{desc.text}</span>
                            </div>
                        ))
                    }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
