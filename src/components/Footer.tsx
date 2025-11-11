import { FaFacebook, FaTwitter, FaInstagram , FaEnvelope} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-yellow-500 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-20 py-6 m-10 ">
        
        <div className="grid grid-cols-1 md:grid-cols-4 !mb-8 gap-x-2 gap-y-8">
          {/* Company Column */}
          <div >
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="">
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Partner with us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="">
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        
          {/* Newsletter Column */}
          <div className="mr-4">
            <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-6 mb-4">
              <a
                href="https://web.facebook.com/africatosiliconvalley"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="https://twitter.com/A2_SV"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>

              <a
                href="https://www.instagram.com/a2sv_org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
            </div>
            <p className="text-sm mb-4">Receive exclusive offers in your mailbox</p>
            <div className="relative flex gap-2">
            <div className="relative flex min-w-52">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-white" size={16} /> 
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="pl-10 py-2  rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 text-sm w-full rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 text-sm w-full"
              />
            </div>
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold text-sm shadow-lg shadow-yellow-400/30">
              Subscribe
            </button>
          </div>
          </div>
          
        </div>

      </div>
    </footer>
  )
}