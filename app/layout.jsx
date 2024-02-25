
import "./globals.css";
import Navbar from "./_components/navbar/page";

import { faFacebook, faInstagram, faTwitter, faLinkedin, faReddit, faWhatsapp, faYoutube, faGithub, faGoogle, faTelegram, faApple} from "@fortawesome/free-brands-svg-icons"; // Import all brand icons
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faFacebook, faInstagram, faTwitter, faLinkedin, faReddit, faWhatsapp, faYoutube, faGithub, faGoogle, faTelegram, faApple)



export const metadata = {
  title: "Pinnacle Events",
  description: "Pinnacle Events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`m-0 bg-white overflow-y-scroll`}>
        <nav>{<Navbar />}</nav>
        {children}
      </body>
    </html>
  );
}
