

import Link from 'next/link'
// import { Player } from '@lottiefiles/react-lottie-player';
import sampleImage from '../../../public/static/images/car.jpg'
import Image from 'next/image';

const servicesData = [
    {
        id : 1,
        title : 'Talent Acquisition',
        description : 'We provide comprehensive talent acquisition solutions, including candidate sourcing, screening, and interviewing, to ensure that your organization has access to the best candidates.',
        image : sampleImage
    },
    {
        id : 2,
        title : 'Manpower Sourcing',
        description : 'We specialize in finding the right talent for your organization, sourcing candidates who match your specific requirements and needs.',
        image : sampleImage
    },
    {
        id : 3,
        title : 'Recruitment Solutions',
        description : 'Our recruitment solutions are customized to meet your specific needs. We offer end-to-end recruitment services including candidate sourcing, screening, interviewing, and onboarding.',
        image : sampleImage
    },

]




export default function Services(){


  return (
    <div className="flex flex-col justify-start bg-[#191919] text-white items-center bg-cover bg-center lg:pt-[5rem] py-16 p-8 w-full lg:px-16">
        <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        className="text-center font-serif">
            <div className="text-4xl md:text-4xl lg:text-6xl font-bold">Our Services</div>
            <div>We provide the best in class services for our customers.</div>
        </div>
        
            <div
            data-aos='fade-up'
            data-aos-delay='100'
            data-aos-duration="500"
            className="flex flex-col lg:flex-row lg:p-8"> 
                {
                    servicesData.map(item => {

                        return (
                        <div
                        
                        key={item.id} className=' w-full border-gray-300 border-2 my-4 lg:m-4 rounded-2xl lg:w-4/12 hover:scale-105 transition-all shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            {/* <Image src={item.image} alt='Services card' className=' rounded-t-xl' /> */}
                            <Image
                            src={item.image}
                                loop
                                autoPlay
                                className=' lg:h-[17rem] w-full rounded-2xl'
                            />
                            <div className='p-4'>
                                <div className=' font-serif font-semibold text-xl'>{item.title}</div>
                                <p className=' text-justify mb-2'>{item.description}</p>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
    
        <div>
        <Link
        // data-aos='fade-up'
        // data-aos-delay='50'
        // data-aos-duration="500"
        href="/services" className="relative inline-flex text-lg items-center mt-4 lg:mt-0 justify-start inline-block px-8 py-3 overflow-hidden font-bold rounded-lg group">
            <span className="w-80 h-48 rotate-45 -translate-x-4 -translate-y-10 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-60 h-60 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-96 -translate-y-32 bg-white opacity-100 group-hover:-translate-x-5"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">View All Services!</span>
            <span className="absolute inset-0 border-2 border-white rounded-lg"></span>
        </Link>
        </div>
    </div>
  )
}

