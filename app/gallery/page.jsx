"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

// Sample categories
const categories = [
  "All",
  "Corporate",
  "Wedding",
  "Product Launch",
  "Social Gathering",
];

const GallerySection = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events?page=${pageNumber}&limit=9`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      if (pageNumber === 1) {
        setEvents(data?.events);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data?.events]);
      }
      setHasMore(data?.hasMore);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  useEffect(() => {
    const filtered = events?.filter((event) => {
      const matchesFilter = filter === "All" || event.type === filter;
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredEvents(filtered);
  }, [filter, searchTerm, events]);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <section className="py-16 px-4 pt-28 lg:px-8 bg-primaryLight dark:bg-primaryDark text-black dark:text-white">
      <div className="container mx-auto">
        {/* <h2 className="text-4xl font-bold mb-10 text-center dark:text-white">
          Our Portfolio
        </h2> */}

        <h2 className="text-3xl md:text-4xl lg:text-5xl mt-4 mb-10 text-center font-serif font-semibold">
        <span className=" opacity-85">Our </span> 
        {/* <span className="bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">Services</span> */}
        <span className="text-blue-400">Portfolio</span>
      </h2>

        {/* Filter and Search */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === category
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800 hover:bg-purple-100"
              }`}
            >
              {category}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full md:w-80"
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents?.map((event) => {
              const mainImage = event?.gallery?.find(
                (item) => item.type === "main"
              );
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-[#2c2c2c] rounded-lg overflow-hidden shadow-lg flex flex-col cursor-pointer"
                  onClick={() => openModal(event)}
                >
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={mainImage ? mainImage?.src : event?.gallery[0]?.src}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 left-0"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold mb-2">
                      {capitalizeFirstLetter(event?.title)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {event.description}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                      <span>{event.type}</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {!loading && hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Show More
            </button>
          </div>
        )}
        {
          loading && (
            <div className=" z-50 flex items-center justify-center">
              <div className="text-gray-500 dark:text-gray-400 text-xl">Loading...</div>
            </div>
          )
        }

        {/* No Results Message */}
        {!loading && filteredEvents.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No events found matching your criteria.
          </p>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-white dark:bg-[#2c2c2c] rounded-lg p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 bg-purple-600 text-white py-2 px-3 rounded-full hover:bg-purple-700 transition-colors duration-200"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faX} className="text-lg" />
                </button>

                <h2 className="text-3xl font-bold mb-6 mt-2">
                  {capitalizeFirstLetter(selectedEvent?.title)}
                </h2>

                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Description
                    </h3>
                    <div className="text-gray-800 dark:text-gray-200 space-y-4">
                      {selectedEvent?.description
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Type
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200">
                        {selectedEvent?.type}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Client
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200">
                        {selectedEvent?.client}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Date
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200">
                        {selectedEvent?.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedEvent?.gallery?.map((image) => (
                      <div key={image.id} className="relative pt-[75%]">
                        <Image
                          src={image.src}
                          alt={`Gallery image ${image.id}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded absolute top-0 left-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
