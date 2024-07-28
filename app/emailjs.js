
import emailjs from '@emailjs/browser';

const sendEmail = async (values) => {
    const res = await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY, values, process.env.NEXT_PUBLIC_EMAILJS_SECRET_KEY)
    .then((result) => {
        console.log("Email send ",result);
        return result;
    }, (error) => {
        console.log("something went wrong while sending email ", error);
        return error
    });

    return res;
}



export  { sendEmail };