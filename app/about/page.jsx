import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import CallToAction from "../_components/CTA/CallToAction";
import heroBg from '../../public/static/images/about-us-bg.jpg';
import about2 from '../../public/static/images/about-2.jpg';
import pfp from '../../public/static/images/pfp.jpg'

const AboutUs = () => {
  return (
    <div className=" bg-primaryLight dark:bg-primaryDark text-black dark:text-white py-16 lg:pt-20 flex flex-col justify-center items-center transition-colors duration-200 ">
      <div className="relative h-[60vh] w-full">
        <Image
          src={heroBg}
          layout="fill"
          objectFit="cover"
          alt="Pinnacle Events Showcase"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Pinnacle Events
          </h1>
          <p className="text-xl md:text-2xl">
            Crafting Unforgettable Experiences Since 2010
          </p>
        </div>
      </div>
      {/* our story */}
      <section className="py-20 pb-10 px-4 lg:px-24 bg-primaryLight dark:bg-primaryDark transition-colors duration-200">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 h-16">
            Our Story
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="col-span-2 space-y-6">
              <p className="text-lg leading-relaxed">
                Founded in 2010 in Ahmedabad, Pinnacle Events emerged from a
                vision to redefine event experiences. What began as a small team
                with big dreams has blossomed into a renowned full-service event
                planning powerhouse, known for our creativity, meticulous
                attention to detail, and flawless execution.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey has been marked by continuous growth, expanding our
                reach across Gujarat and beyond. We've transformed countless
                visions into reality, crafting events that resonate long after
                they conclude.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-2xl group">
              <Image
                // src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                src={about2}
                layout="fill"
                objectFit="cover"
                alt="Pinnacle Events Team"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
                <p className="text-white text-xl font-semibold">
                  Our passionate team, the heart of Pinnacle Events
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 flex flex-col items-between justify-center rounded-2xl shadow-xl p-8 mb-16 lg:px-16">
            <h3 className="text-2xl font-bold mb-6 text-center ">
              Our Evolution
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2010</div>
                <p>Founded in Ahmedabad</p>
              </div>
              <div className="h-0.5 w-full md:w-0.5 md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-purple-600 to-indigo-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2015</div>
                <p>Expanded to all of Gujarat</p>
              </div>
              <div className="h-0.5 w-full md:w-0.5 md:h-24 bg-gradient-to-r md:bg-gradient-to-b from-purple-600 to-indigo-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2020</div>
                <p>National presence established</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* core values */}
      <section className="py-16 px-4 md:px-24 bg-primaryLight dark:bg-primaryDark transition-colors duration-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Creativity</h3>
              <p>We push boundaries to create unique, memorable experiences.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p>
                We work closely with our clients and partners to achieve shared
                goals.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p>We strive for perfection in every detail of our events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="bg-primaryLight dark:bg-primaryDark py-16 px-4 md:px-24 transition-colors duration-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src={pfp}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-full mx-auto mb-4"
                alt="Sarah Johnson"
              />
              <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
              <p className="mb-2">Founder & CEO</p>
              <p className="text-sm">
                With over 15 years in the industry, Sarah's vision and
                leadership drive our success.
              </p>
            </div>
            <div className="text-center">
              <Image
                src={pfp}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-full mx-auto mb-4"
                alt="Michael Lee"
              />
              <h3 className="text-xl font-bold mb-2">Michael Lee</h3>
              <p className="mb-2">Creative Director</p>
              <p className="text-sm">
                Michael's innovative designs have won multiple industry awards.
              </p>
            </div>
            <div className="text-center">
              <Image
                src={pfp}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-full mx-auto mb-4"
                alt="Emily Chen"
              />
              <h3 className="text-xl font-bold mb-2">Emily Chen</h3>
              <p className="mb-2">Event Coordinator</p>
              <p className="text-sm">
                Emily's attention to detail ensures flawless execution of every
                event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-16 px-4 md:px-24 bg-primaryLight dark:bg-primaryDark transition-colors duration-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="mb-4 italic">
                "Pinnacle Events turned our product launch into an unforgettable
                experience. Their creativity and professionalism are unmatched."
              </p>
              <div className="flex items-center">
                <Image
                  src={pfp}
                  width={50}
                  height={50}
                  objectFit="cover"
                  className="rounded-full mr-4"
                  alt="John Smith"
                />
                <div>
                  <p className="font-bold">John Smith</p>
                  <p className="text-sm">CEO, Tech Innovations Inc.</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <p className="mb-4 italic">
                "Working with Pinnacle Events made our wedding day absolutely
                perfect. They thought of every detail and made our dreams come
                true."
              </p>
              <div className="flex items-center">
                <Image
                  src={pfp}
                  width={50}
                  height={50}
                  objectFit="cover"
                  className="rounded-full mr-4"
                  alt="Sarah and Tom Davis"
                />
                <div>
                  <p className="font-bold">Sarah and Tom Davis</p>
                  <p className="text-sm">Happy Couple</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* call to action  */}
      <div className=" lg:px-24 pt-6">
      <CallToAction />
      </div>
    </div>
  );
};

export default AboutUs;
