import React from "react";

const sampleTestimonials = [
  {
    "id": "001",
    "name": "John Doe",
    "head": "Marketing Director at Tech Innovators Inc.",
    "testimonial": "Pinnacle Events exceeded our expectations with their innovative approach and flawless execution. Our product launch was a huge success, thanks to their dedicated team."
  },
  {
    "id": "002",
    "name": "Jane Smith",
    "head": "CEO at Global Enterprises",
    "testimonial": "The professionalism and attention to detail displayed by Pinnacle Events were outstanding. They transformed our annual conference into a truly memorable event."
  },
  {
    "id": "003",
    "name": "Robert Brown",
    "head": "Event Coordinator at Healthcare Solutions Ltd.",
    "testimonial": "From start to finish, Pinnacle Events provided exceptional service. Their creativity and meticulous planning made our corporate event a resounding success."
  },
  {
    "id": "004",
    "name": "Emily Johnson",
    "head": "Brand Manager at Retail Giants",
    "testimonial": "Working with Pinnacle Events was a pleasure. Their team seamlessly handled all aspects of our brand activation campaign, resulting in increased customer engagement and brand loyalty."
  },
  {
    "id": "005",
    "name": "Michael Davis",
    "head": "Director of Operations at Tech Solutions Co.",
    "testimonial": "Pinnacle Events went above and beyond to ensure our company retreat was a hit. Their attention to detail and commitment to excellence were evident in every aspect of the event."
  },
  {
    "id": "006",
    "name": "Sarah White",
    "head": "Marketing Manager at Innovative Startups Inc.",
    "testimonial": "We couldn't have asked for a better team than Pinnacle Events for our product launch. They brought our vision to life and made the event a huge success."
  },
  {
    "id": "007",
    "name": "Daniel Clark",
    "head": "Event Coordinator at Global Tech Solutions",
    "testimonial": "Pinnacle Events made our corporate gala a night to remember. Their professionalism and creativity impressed both our guests and our executives."
  },
  {
    "id": "008",
    "name": "Olivia Brown",
    "head": "PR Manager at Fashion Trends Ltd.",
    "testimonial": "Partnering with Pinnacle Events for our fashion show was a game-changer. They executed flawlessly, ensuring our brand was showcased in the best possible light."
  }
]




const Testimonials = () => {
  return (
    <div className=" bg-primaryLight dark:bg-primaryDark dark:text-white py-24 flex flex-col justify-center items-center transition-colors duration-200 ">
      <div className=" text-3xl md:text-4xl lg:text-5xl text-center font-serif font-semibold">
        What our clients have to say
      </div>
      <div className=" p-6 text-lg lg:px-52 lg:text-2xl text-center my-4 opacity-90">
        At Pinnacle Events, client satisfaction is our top priority. We are
        proud to share the feedback from our valued clients who have experienced
        our dedication to excellence and creativity firsthand. Their
        testimonials reflect our commitment to delivering outstanding event
        management and innovative solutions.
      </div>
      <div className="flex flex-wrap w-full items-stretch gap-6 mt-4 justify-center">
        {
          sampleTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className="flex flex-col items-start justify-center px-8 py-4 dark:border-neutral-700 bg-white dark:bg-neutral-800 border-2 rounded-lg w-5/6 md:w-2/5 lg:w-1/4 transition-colors duration-200">
                        <div className="text-2xl font-semibold text-black dark:text-white">{testimonial.name}</div>
                        <div className="text-black dark:text-white">{testimonial.head}</div>
                        {/* <div className="text-gray-400">{testimonial.company}</div> */}
                        <div className=" text-lg text-gray-500 text-pretty">{testimonial.testimonial}</div>
                      </div>
                    ))
        }
      </div>
    </div>
  );
};

export default Testimonials;
