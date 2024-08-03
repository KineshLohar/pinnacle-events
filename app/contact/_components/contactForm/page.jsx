'use client'
import { sendEmail } from "@/app/emailjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { toast } from "react-toastify";
import * as Yup from "yup";

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

export default function ContactPageForm(){

  // const handleSubmitForm = async (data) => {
  //   try {
  //     const response = await fetch('/api/contactForm', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body : JSON.stringify(data), // Convert data to JSON string
  //     });
  
  //     if (response.ok) {
  //       const resData = await response.json(); // Parse response JSON
  //       console.log("Response data", resData);
  //     } else {
  //       console.log("Failed to submit form:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  
  // const handleSubmitForm = async(data) => {
  //   const response = await sendEmail(data)
  // }

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

    return (
        <div
        id="contact"
        className="flex flex-col justify-start items-center bg-cover bg-center w-full xl:px-28"
      >
        {/* <div
        data-aos='fade-up'
        data-aos-delay='50'
        data-aos-duration="500"
        className="text-4xl md:text-4xl lg:text-6xl font-bold mb-10">
          Contact Us
        </div> */}
        <div className="flex flex-col px-8 md:px-4 lg:px-0 justify-center items-center gap-6 text-center w-full md:flex-row md:text-left ">
          <div
          data-aos='fade-up'
          data-aos-delay='50'
          data-aos-duration="500"
          className="w-full md:w-6/12  bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl">
            {/* <div className="mb-6 lg:text-2xl font-bold mx-4">Our Location</div> */}
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117477.53492821137!2d72.47040831871179!3d23.054119499120837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848ac8a7faf3%3A0xe0e23928ee7635dc!2sJ%20S%20Projects%20%26%20Fiscal%20Services%20Private%20Limited!5e0!3m2!1sen!2sin!4v1715066388098!5m2!1sen!2sin" 
           width="100%" 
           height='490' 
           className='rounded-2xl'
           style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div
          data-aos='fade-up'
          data-aos-delay='50'
          data-aos-duration="500"
          className="w-full bg-slate-300/70 backdrop-blur-lg p-8 pt-10 md:w-6/12 rounded-xl ">
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
                <Form onSubmit={handleSubmit} className="flex flex-col text-black ">
                  <div className="flex flex-col mb-6 font-bold text-2xl ">
                    Contact Form
                  </div>
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
                      Submit!
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
    )
}