import Accordion from "./Accoridion"

const questions = [
    {
        id: 1,
        question: 'What programming languages do you support?',
        answer: 'We support a diverse array of programming languages to cater to the needs of our developers. Our platform accommodates popular languages such as JavaScript, Python, Java, C++, and Ruby, among others. Additionally, we strive to stay updated with emerging languages and frameworks, ensuring our platform remains versatile and adaptable to evolving technological landscapes.'
    },
    {
        id: 2,
        question: 'How do I get started with your API?',
        answer: 'Getting started with our API is straightforward and well-documented to facilitate a seamless integration experience for developers. We provide comprehensive developer documentation, replete with detailed explanations of endpoints, authentication mechanisms, request and response formats, and usage examples in multiple programming languages. Furthermore, to expedite the integration process, we offer SDKs and libraries tailored to various languages, streamlining API usage and empowering developers to leverage our platform efficiently.'
    },
    {
        id: 3,
        question: 'Can I contribute to your open-source projects?',
        answer: `'Absolutely! We enthusiastically welcome contributions from the vibrant open-source community. Our projects are hosted on popular platforms such as GitHub, providing a collaborative environment for developers worldwide. Whether it's submitting bug fixes, proposing new features, or enhancing existing functionality, we value and encourage community involvement. By fostering an open and inclusive ecosystem, we endeavor to harness the collective expertise and creativity of developers, enriching our projects and benefiting the broader community.'`
    },
    {
        id: 4,
        question: 'Do you provide technical support for developers?',
        answer: `Yes, we are committed to providing robust technical support to empower developers in their endeavors. Our dedicated support team comprises knowledgeable professionals who are readily available to assist with any technical queries or challenges you may encounter. Whether it's troubleshooting integration issues, clarifying API functionality, or offering guidance on best practices, our support team is just a message away. You can reach out to us via various channels, including email, live chat, and community forums, ensuring prompt and personalized assistance tailored to your needs.`
    }
];




export default function FAQ(){

   
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div
            data-aos='fade-up'
            data-aos-delay='50'
            data-aos-duration="500"
            className='w-full flex flex-col items-center justify-center text-center'>
                <h3 className='font-bold text-4xl font-serif'>Frequently Asked Questions</h3>
                <p className="px-8 lg:px-32 my-2 font-semibold opacity-70 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem temporibus aut quia ipsa et fugiat odit impedit aliquid, numquam molestias perspiciatis voluptatem delectus nulla minima praesentium? Quisquam id totam ut.</p>
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