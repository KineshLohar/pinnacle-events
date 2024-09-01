import Accordion from "./Accoridion"

const questions = [
    {
        id: 1,
        question: 'What types of events does Pinnacle Events specialize in?',
        answer: 'Pinnacle Events specializes in creating, planning, and executing a wide range of events including corporate functions, conferences, product launches, social gatherings, and more. We offer comprehensive services for both corporate events (such as conferences, seminars, and product launches) and social events (such as weddings, parties, and celebrations).'
    },
    {
        id: 2,
        question: 'What services does Pinnacle Events offer?',
        answer: 'Pinnacle Events offers a comprehensive range of services including event planning and coordination, venue selection and management, catering services, audio-visual and technical support, concept development, budget management, timeline creation, vendor coordination, and on-site management. We provide end-to-end solutions for all aspects of event management.'
    },
    {
        id: 3,
        question: 'How does Pinnacle Events ensure the success of an event?',
        answer: 'Pinnacle Events ensures event success through several key factors: our experienced and professional team, comprehensive service offerings, creative and innovative solutions, established vendor relationships, and meticulous attention to detail. We handle all aspects of event planning and coordination, allowing clients to focus on their guests and the content of the event rather than logistical details.'
    },
    {
        id: 4,
        question: 'What types of marketing services does Pinnacle Events provide?',
        answer: 'Pinnacle Events offers a wide range of marketing services including experiential marketing, brand activation, direct marketing, digital advertising, M.I.C.E. (Meetings, Incentives, Conferences, and Exhibitions), in-store marketing, loyalty programs, mobile marketing, launch events, media buying, retail fabrication, sales acceleration programs, trade marketing, outdoor strategy and buying, and school/college programs.'
    },
    {
        id: 5,
        question: 'Does Pinnacle Events offer retail solutions?',
        answer: 'Yes, Pinnacle Events offers comprehensive retail solutions. These include retail VM (Visual Merchandising) planning, designing and execution, retail fixtures & merchandise, in-shop promotions, catchment promos, and technology-based sampling. We focus on creating a sustained look and feel, encouraging in-store sales, and building customer loyalty.'
    }
];




export default function FAQ(){

   
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div
            data-aos='fade-up'
            data-aos-delay='50'
            data-aos-duration="500"
            className='w-full text-black dark:text-white flex flex-col items-center justify-center text-center'>
                <h3 className='font-bold text-4xl font-serif'>Frequently Asked Questions</h3>
<p className="px-8 lg:px-32 my-2 font-semibold opacity-70 text-center">
  At Pinnacle Events, we understand you may have questions about our comprehensive event planning and management services. 
  From corporate functions to social gatherings, our experienced team is dedicated to creating memorable experiences. 
  Below, we've compiled answers to some common queries to help you understand how we can bring your vision to life, 
  ensuring every detail is meticulously handled from concept to execution.
</p>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4 my-8">
                {
                    questions.map((data) => {
                        return (
                            <Accordion data={data} key={data.id} />
                        )
                    })
                }
                
            </div>
        </div>
    )
}