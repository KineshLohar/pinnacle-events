import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faPuzzlePiece, faLightbulb, faClipboardCheck, faHandshake } from '@fortawesome/free-solid-svg-icons';

const ExpertiseHighlights = () => {
  const expertiseItems = [
    {
      icon: faUsers,
      title: "Experienced Team",
      description: "Skilled professionals excelling in all aspects of event planning and execution."
    },
    {
      icon: faPuzzlePiece,
      title: "Comprehensive Services",
      description: "One-stop solution for all your event management needs."
    },
    {
      icon: faLightbulb,
      title: "Creative Solutions",
      description: "Thinking outside the box to make each event unique and memorable."
    },
    {
      icon: faClipboardCheck,
      title: "Attention to Detail",
      description: "Meticulously managing every aspect of your event, ensuring nothing is overlooked."
    },
    {
      icon: faHandshake,
      title: "Client-Centric Approach",
      description: "Your vision is our priority, and we work tirelessly to exceed your expectations."
    }
  ];

  return (
    <section className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white py-16 lg:px-24 transition-colors duration-200 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Why Choose <span className="text-blue-400">Pinnacle Events</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseItems.map((item, index) => (
            <div 
              key={index}
              className="dark:bg-[#2c2c2c] bg-slate-50 dark:text-white text-black p-6 rounded-lg drop-shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <div className="text-blue-400 mb-4">
                <FontAwesomeIcon icon={item.icon} size="3x" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white text-black">{item.title}</h3>
              <p className="dark:text-gray-300 text-gray-800">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseHighlights;