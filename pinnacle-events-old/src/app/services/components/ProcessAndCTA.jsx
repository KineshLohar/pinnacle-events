import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { 
  faComments, 
  faClipboardList, 
  faHandshake, 
  faCogs, 
  faPlayCircle, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';
import CallToAction from '@/app/_components/CTA/CallToAction';

const ProcessAndCTA = () => {
  const processSteps = [
    { icon: faComments, title: "Initial Consultation", description: "We meet to discuss your vision, goals, and requirements." },
    { icon: faClipboardList, title: "Proposal and Planning", description: "We create a detailed event proposal and timeline." },
    { icon: faHandshake, title: "Vendor Coordination", description: "We select and manage the best vendors for your event." },
    { icon: faCogs, title: "Logistics Management", description: "We handle all the behind-the-scenes details." },
    { icon: faPlayCircle, title: "On-Site Execution", description: "Our team ensures smooth running on the day of the event." },
    { icon: faChartLine, title: "Post-Event Evaluation", description: "We review the event's success and gather feedback." }
  ];

  return (
    // <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 lg:px-24">
    <section className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white py-16 lg:pb-8 lg:px-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Our Event <span className="text-blue-400">Planning Process</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="dark:bg-[#2c2c2c] bg-slate-50 dark:text-white text-black p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={step.icon} className="text-blue-400 text-2xl mr-4" />
                <h3 className="text-xl font-semibold dark:text-white text-black">{step.title}</h3>
              </div>
              <p className="dark:text-gray-300 text-gray-800">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <CallToAction />
      </div>
    </section>
  );
};

export default ProcessAndCTA;