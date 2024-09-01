import { faComments, faEnvelope, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import ContactPageForm from "./_components/contactForm/page";
import FAQ from "./_components/faq/Faq";
import { socials } from "../Socials";

const DividerComp =() => {
    return (
    <hr
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        className="w-6/12 my-12 mt-14 h-[4px] mx-auto bg-[linear-gradient(to_right,theme(colors.pink.600),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] animate-gradient opacity-45 border-0 rounded " />
    )
    }

export default function Contact(){

    

    return (
        <div className="bg-primaryLight dark:bg-primaryDark text-white w-full flex flex-col items-center justify-center lg:p-20 pt-[7rem] lg:pt-[7rem] pb-16">
            <div
            data-aos='fade-up'
            data-aos-delay='50'
            data-aos-duration="500"
            className="text-3xl p-4 font-serif lg:text-5xl text-center font-bold mt-6 mb-12 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                Feel Free To Reach Us Out For Enquiries!
            </div>
            <div
            data-aos='fade-up'
            data-aos-delay='50'
            data-aos-duration="500"
            className="w-full flex gap-8 flex-col md:flex-row justify-between px-8 lg:p-0">
                <div className="md:w-4/12 flex flex-col gap-2 justify-center items-start p-8 px-14 rounded-lg text-left drop-shadow-md shadow-slate-200   bg-gradient-to-r from-violet-50 to-pink-50">
                    <FontAwesomeIcon icon={faPhoneVolume} style={{color: "#7950f7",}} className="h-12" />
                    <div className=" font-bold text-2xl font-sans text-black">Our Contact Number</div>
                    <div className='font-medium text-gray-500 opacity-70' >
                        <div>+91 82006 93373</div>
                        {/* <div>+91 99999 00000</div> */}
                    </div>
                </div>
                <div className="md:w-4/12 flex flex-col gap-2 justify-center items-start p-10 px-14 rounded-lg text-left drop-shadow-md shadow-slate-200  bg-gradient-to-r from-violet-50 to-pink-50">
                    <FontAwesomeIcon icon={faEnvelope} style={{color: "#794dff",}} className="h-12"/>
                    <div className=" font-bold text-2xl font-sans text-black">Our Email Address</div>
                    <div className='font-medium text-gray-500 opacity-70'>
                        <div>pinnaclevent13@gmail.com</div>
                        {/* <div>+91 99999 00000</div> */}
                    </div>
                </div>
                <div className="md:w-4/12 flex flex-col gap-2 justify-center items-start p-10 px-14 rounded-lg text-left drop-shadow-md shadow-slate-200 bg-gradient-to-r from-violet-50 to-pink-50">
                    <FontAwesomeIcon icon={faComments} style={{color: "#8059f8",}} className="h-12" />
                    <div  className=" font-bold text-2xl font-sans text-black">Our Social Accounts</div>
                    <div className="flex">
                    {socials.map((social) => (      
                            <Link key={social.id} href={social.path} legacyBehavior className="">                      
                                {/* <FontAwesomeIcon icon={social.icon} height='2rem' /> */}
                                <SocialIcon url={social.path} className="mr-4 hover:scale-105 transition-all "  style={{height : '2rem', width : '2rem'}} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <DividerComp />
            <ContactPageForm />
            <DividerComp />
            <FAQ />
            <div>

            </div>
        </div>
    )
}