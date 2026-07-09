import Link from "next/link"

const CallToAction = () => {
  return (
    <div className=" bg-gray-300 dark:bg-slate-200 text-black rounded-lg p-8 md:p-12 text-center">
    <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
      Ready to Create Your Next Memorable Event?
    </h3>
    <p className="text-black text-lg mb-6">
      Contact us today to discuss how we can bring your vision to life. Whether you're planning a corporate function, a product launch, or a social gathering, our team is ready to make it extraordinary.
    </p>
    <div className=' hover:scale-105 transition-transform duration-200'>
    <Link href='/contact' className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-900 hover:scale-105 transition-all duration-300">
      Contact Us
    </Link>
    </div>
    
  </div>
  )
}

export default CallToAction