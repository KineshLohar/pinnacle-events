import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMusic, 
  faUserFriends, 
  faShieldAlt, 
  faBus, 
  faCamera, 
  faHashtag, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';

const AdditionalServices = () => {
  const services = [
    { icon: faMusic, title: "Entertainment Booking", description: "Curate the perfect entertainment for your event." },
    { icon: faUserFriends, title: "Guest List Management", description: "Efficiently manage your event attendees." },
    { icon: faShieldAlt, title: "Event Security", description: "Ensure a safe and secure environment for all guests." },
    { icon: faBus, title: "Transportation Coordination", description: "Seamless logistics for guest transportation." },
    { icon: faCamera, title: "Event Photography/Videography", description: "Capture every moment of your special event." },
    { icon: faHashtag, title: "Social Media Integration", description: "Enhance your event's online presence." },
    { icon: faChartLine, title: "Post-Event Analysis", description: "Comprehensive reporting and event evaluation." }
  ];

  return (
    <section className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white py-16 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black dark:text-white">
          Additional <span className="text-blue-400">Services</span>
        </h2>
        <p className="text-center text-gray-800 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Beyond our core offerings, Pinnacle Events provides a range of specialized services to ensure your event is truly exceptional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="dark:bg-[#2c2c2c] bg-slate-50 text-white dark:text-black p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={service.icon} className="text-blue-500 text-2xl mr-4" />
                <h3 className="text-xl font-semibold dark:text-white text-black">{service.title}</h3>
              </div>
              <p className="dark:text-gray-300 text-gray-800">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;