import Link from "next/link";
import smapleImage from "@/public/static/images/car.jpg"
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const events = [
  {
    id: 1,
    image: smapleImage,
    title: "Summer Music Festival",
    location: "Central Park, New York",
    eventType: "Music Festival",
  },
  {
    id: 2,
    image: smapleImage,
    title: "Tech Conference 2024",
    location: "San Francisco, CA",
    eventType: "Conference",
  },
  {
    id: 3,
    image: smapleImage,
    title: "Food Truck Festival",
    location: "Seattle, WA",
    eventType: "Food Festival",
  },
  {
    id: 4,
    image: smapleImage,
    title: "Art Exhibition: Modern Perspectives ",
    location: "London, UK",
    eventType: "Art Exhibition",
  },
];

const PortfolioSection = () => {
  return (
    <div className=" bg-[#191919] text-white py-24 flex flex-col justify-center items-center">
      <div className=" text-3xl md:text-4xl lg:text-5xl text-center font-serif font-semibold">A Glimpse of Our Craftsmanship</div>
      <div className=" p-6 text-lg lg:px-52 lg:text-2xl text-center my-4 opacity-90">
        Explore our diverse portfolio showcasing exceptional events and
        innovative marketing solutions. Each project highlights our dedication
        to creativity, precision, and excellence, turning client visions into
        unforgettable experiences.
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 px-4 py-4 lg:px-28 lg:py-14">
        {events.map((event) => (
          <div key={event.id}>
            <Image src={event.image} alt={event.title} className=" rounded-3xl" />
            <div className=" text-3xl font-semibold mt-2">{event.title}</div>
            <div className="flex items-center justify-start my-1 "><FontAwesomeIcon icon={faLocationDot} className=" h-4 mr-2"/> {event.location}</div>
            <div className=" opacity-80">{event.eventType}</div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Link
        // data-aos='fade-up'
        // data-aos-delay='50'
        // data-aos-duration="500"
        href="/gallery" className="relative inline-flex text-lg items-center mt-4 lg:mt-0 justify-start inline-block px-8 py-3 overflow-hidden font-bold rounded-lg group">
            <span className="w-80 h-48 rotate-45 -translate-x-4 -translate-y-10 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-64 h-64 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-96 -translate-y-32 bg-white opacity-100 group-hover:-translate-x-3"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">Explore Our Portfolio!</span>
            <span className="absolute inset-0 border-2 border-white rounded-lg"></span>
        </Link>
        </div>
    </div>
  );
};

export default PortfolioSection;
