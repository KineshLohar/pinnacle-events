import About from "./_components/about/page";
import Clients from "./_components/clients/page";
import Contact from "./_components/contact/page";
import Hero from "./_components/hero/page";
import PortfolioSection from "./_components/portfolio/page";
import Services from "./_components/services/page";
import Testimonials from "./_components/testimonials/page";
import Totals from "./_components/totals/page";

const DividerComp =() => {
  return (
  <hr
      // data-aos='fade-up'
      // data-aos-delay='50'
      // data-aos-duration="500"
      className="w-4/12 h-1 bg-black dark:bg-white  mx-auto rounded-lg"
      // className="w-12/12 h-[4px] mx-auto bg-[linear-gradient(to_right,theme(colors.pink.600),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] animate-gradient opacity-45 border-0 rounded " 
      />
  )
  }

export default function Home() {
  return (
    <>
    <Hero />
    {/* <DividerComp /> */}
    <About />
    <DividerComp />
    <Services />
    <DividerComp />
    <Clients />
    <Totals />
    <DividerComp />
    <PortfolioSection />
    <DividerComp />
    <Testimonials />
    <DividerComp />
    <Contact />
    </>
  );
}
