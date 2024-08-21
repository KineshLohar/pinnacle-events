"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { SocialIcon } from 'react-social-icons'
import { sendEmail } from "@/app/emailjs";
import { toast } from "react-toastify";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans(
  {
    weight : '600',
    subsets : ['latin']
  }
)

const Contact = () => {
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Name is too short!")
      .required("Name is required!"),
    email: Yup.string()
      .email("Please enter valid email!")
      .required("Email is required!"),
    message: Yup.string()
      .min(10, "Message is too short!")
      .required("Message is required!"),
  });

  const socials = [
    {
        id: 1,
        name: "Facebook",
        path: "https://www.facebook.com/pinnacle.events/",
        icon: 'fa-brands fa-facebook',
        color : "#0355e2"
    },
    {
        id: 2,
        name: "Instagram",
        path: "https://www.instagram.com/pinnacle.events/",
        icon: 'fa-brands fa-instagram',
        color : "#0355e2"
    },
    {
        id: 3,
        name: "LinkedIn",
        path: "https://www.linkedin.com/company/pinnacle-events/",
        icon: 'fa-brands fa-linkedin',
    },
    // {
    //     id: 4,
    //     name: "Twitter",
    //     path: "https://twitter.com/pinnacle_events",
    //     icon: 'fa-brands fa-twitter',
    //     color : "#0355e2"
    // },
    // {
    //     id: 5,
    //     name: "YouTube",
    //     path: "https://www.youtube.com/channel/UC-99999999",
    //     icon: 'fa-brands fa-youtube',
    //     color : "#0355e2"
    // }
];

  return (
    <div
      id="contact"
      className="flex flex-col justify-start items-center bg-cover bg-center lg:pt-[5rem] p-8 pb-12 w-full lg:min-h-[100vh] lg:px-28"
    >
      <div
      data-aos='fade-up'
      data-aos-delay='50'
      data-aos-duration="500"
      className="text-4xl md:text-4xl lg:text-6xl font-bold mb-16 dark:text-white">
        Contact Us
      </div>
      <div className="flex flex-col justify-center items-center text-center w-full md:flex-row md:text-left ">
        <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        className="w-12/12 md:w-5/12">
          <div className="text-3xl md:text-5xl mt-10 mb-6 lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600 ">
            Have a discussion with us!!
          </div>
          <div className="text-lg md:text-xl font-serif ">
            <div className=" flex flex-col mb-2">
              <div className=" text-gray-500 dark:text-slate-50 ">Phone</div>
              <div className={` ${plusJakartaSans.className} dark:text-white`}>+91 82006 93373</div>
            </div>
            <div>
              <div className=" text-gray-500 dark:text-slate-50">Email</div>
              <div className={` ${plusJakartaSans.className} dark:text-white`}>pinnaclevent13@gmail.com</div>
            </div>
            {/* <div> <span className=" text-gray-800">+91 94276 07621</span></div>
            <div><span className=" text-gray-800">js@jsplacement.com</span></div> */}
            <div className="flex justify-evenly flex-wrap w-full my-8 md:justify-start md:items-center">
                {socials.map((social) => (      
                    <Link key={social.id} href={social.path} legacyBehavior className="">                      
                        {/* <FontAwesomeIcon icon={social.icon} height='2rem' /> */}
                        <SocialIcon url={social.path} className="mr-4" style={{height : '2rem', width : '2rem'}} />
                    </Link>
                ))}
            </div>
          </div>
        </div>
        <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        className="w-full bg-slate-300/70 backdrop-blur-lg p-8 pt-10 md:w-5/12 rounded-xl ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={ async (values, {resetForm , setSubmitting}) => {
              const response = await sendEmail(values)
              if(response.status === 200){
                resetForm();
                toast.success("Email Sent Successfully!")
              } else {
                setSubmitting(false)
                toast.error("Something went wrong!")
              }
            }}
            className='w-full'
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="flex flex-col ">
                <div className="flex flex-col ">
                  <label
                    htmlFor="fullName"
                    className=" font-serif flex items-center "
                  >
                    Full Name:<span className="text-red-500 mr-4">*</span>{" "}
                    <ErrorMessage
                      name="fullName"
                      className="text-sm text-red-500"
                      component="div"
                    />
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className="px-4 py-2 rounded-lg my-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className=" font-serif flex items-center"
                  >
                    Email:<span className="text-red-500 mr-4">*</span>{" "}
                    <ErrorMessage
                      name="email"
                      className="text-sm text-red-500"
                      component="div"
                    />
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="px-4 py-2 rounded-lg my-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className=" font-serif flex items-center"
                  >
                    Message:<span className="text-red-500 mr-4">*</span>{" "}
                    <ErrorMessage
                      name="message"
                      className="text-sm text-red-500"
                      component="div"
                    />
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Enter your message..."
                    autoComplete="off"
                    style={{ resize: "none" }}
                    className="px-4 py-2 rounded-lg my-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex text-sm items-center justify-start inline-block mt-4 px-6 py-2 overflow-hidden font-semibold rounded-lg group place-self-end"
                >
                  <span className="w-48 h-48 rotate-45 -translate-x-4 -translate-y-10 absolute left-0 top-0 bg-black opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-60 h-60 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-80 -translate-y-32 bg-black opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </span>
                  <span className="absolute inset-0 border-2 border-black rounded-lg"></span>
                </button>
              </Form>
            )}
          </Formik>
          {/* {console.log(formData)} */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
