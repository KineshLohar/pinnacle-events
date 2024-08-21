
import "./globals.css";
import Navbar from "./_components/navbar/page";

import { faFacebook, faInstagram, faTwitter, faLinkedin, faReddit, faWhatsapp, faYoutube, faGithub, faGoogle, faTelegram, faApple} from "@fortawesome/free-brands-svg-icons"; // Import all brand icons
import { library } from "@fortawesome/fontawesome-svg-core";
import Footer from "./_components/footer/page";
import { ThemeProvider } from "./_components/ThemeProvider";
import { Providers } from "./_components/providers";

library.add(faFacebook, faInstagram, faTwitter, faLinkedin, faReddit, faWhatsapp, faYoutube, faGithub, faGoogle, faTelegram, faApple)



export const metadata = {
  title: "Pinnacle Events",
  description: "Pinnacle Events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className="m-0 bg-primaryLight dark:bg-primaryDark overflow-y-scroll transition-colors duration-200">
      <Providers>
      <ThemeProvider>
        <nav>
          <Navbar />
        </nav>
        <main>
          {children}
        </main>
        <Footer />
      </ThemeProvider>
      </Providers>
    </body>
  </html>
  );
}
