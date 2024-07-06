
import honda from '../../../public/static/images/honda.png';
import hero from '../../../public/static/images/hero.png'
import cadbury from '../../../public/static/images/cadbury.png'
import adani from '../../../public/static/images/adani.png'
import adityaBirla from '../../../public/static/images/adityabirla.png'
import airtel from '../../../public/static/images/airtel.png'
import asianpaints from '../../../public/static/images/asianpaints.png'
import askmebazaar from '../../../public/static/images/askmebazaar.png'
import canon from '../../../public/static/images/canon.png'
import casio from '../../../public/static/images/casio.png'
import dabur from '../../../public/static/images/dabur.png'
import eauset from '../../../public/static/images/eauset.jpg'
import fiat from '../../../public/static/images/fiat.jpg'
import ford from '../../../public/static/images/ford.png'
import godrej from '../../../public/static/images/godrej.png'
import mahindra from '../../../public/static/images/mahindra.jpg'
import moneygram from '../../../public/static/images/moneygram.png'
import nutralite from '../../../public/static/images/nutralite.jpg'
import redbull from '../../../public/static/images/redbull.png'
import sansui from '../../../public/static/images/sansui.png'
import sbi from '../../../public/static/images/sbi.png'
import tata from '../../../public/static/images/tata.png'
import thomascook from '../../../public/static/images/thomasCook.png'
import whirlpool from '../../../public/static/images/whirlpool.png'




import Image from "next/image";

const logos =[
  honda,
  adani,
  adityaBirla,
  airtel,
  asianpaints,
  askmebazaar,
  cadbury,
  canon,
  casio,
  dabur,
  eauset,
  fiat,
  ford,
  godrej,
  hero,
  mahindra,
  moneygram,
  nutralite,
  redbull,
  sansui,
  sbi,
  tata,
  thomascook,
  whirlpool
]

const Clients = () => {

  return (
    <div id='clients' className=" w-full bg-slate-100 h-60 flex flex-col justify-around items-center py-6 border-t-2 border-b-2 border-gray-200 md:px-24">
      <h3 className=" text-center font-bold text-xl mb-8 opacity-80 sm:text-3xl" >Brands we have worked with</h3>
      <div className="w-full inline-flex flex-nowrap overflow-hidden opacity-80 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul id="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {/* <li className=""><Image src={honda} alt="logo"  width={90} className=" object-cover"/> </li> */}
          {
            logos.map((logo, index) =>  <li className="w-28 h-28 relative" key={index}><Image src={logo} alt="logo" fill={true} style={{ objectFit : 'contain', backgroundBlendMode : 'color-burn'}} /> </li>)
          }
        </ul>
        <ul id="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
          {/* <li className=""><Image src={honda} alt="logo"  width={90} className=" object-cover"/> </li> */}
          {
            logos.map((logo, index) =>  <li className="w-28 h-28 relative" key={index}><Image src={logo} alt="logo" fill={true} style={{ objectFit : 'contain', backgroundBlendMode : 'color-burn'}} /> </li>)
          }
        </ul>
      </div>
    </div>
  );
};

export default Clients;