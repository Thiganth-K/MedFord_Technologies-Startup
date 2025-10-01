import React from 'react'

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#6e1fb3] rounded-t-3xl w-full py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-1 items-start">
  {/* Left: Company Info */}
  <div className="flex flex-col items-start col-span-2">
          <span className="font-bold text-xl mb-2 text-[#ffffff]">Medford Technologies</span>
          <p className="text-sm mb-2 text-[#ffffff]">
            Incubated @ Sona Incubation Foundation<br />
            Reg. off : 130, Kallikottai main road, Kondalampatty, 
            Salem – 636010<br />
            

          </p>
          <p className="text-sm mb-2 text-[#ffffff]"><span className="font-semibold">PHONE:</span> +91 90807 05892</p>
          <p className="text-sm mb-2 text-[#ffffff]"><span className="font-semibold">EMAIL:</span> support@medford.in</p>
          <div className="flex space-x-3 mt-2">
            {/* Social Media Icons */}
            <a href="#" aria-label="Facebook" className="hover:text-zinc-300 transition">
              <svg width="28" height="28" fill="#ffffff" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-zinc-300 transition">
              <svg width="28" height="28" fill="#ffffff" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.5c0 .34.04.67.1.99C8.09 9.36 4.8 7.6 2.67 4.9c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.69-6.26 11.69-11.69 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-zinc-300 transition">
              <svg width="28" height="28" fill="#ffffff" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
            </a>
          </div>
        </div>
        {/* Useful Links & Social Media */}
        <div className="flex flex-col items-start">
          <span className="font-bold text-lg mb-2 text-white">Useful Links</span>
          <ul className="text-sm text-white space-y-1 mb-4">
            <li><a href="#" className="hover:text-zinc-300 hover:underline">Home</a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">About us</a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">Product</a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">Services</a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">Our Jourm</a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">Social Media </a></li>
            <li><a href="#" className="hover:text-zinc-300 hover:underline">News / Blogs</a></li>
          </ul>
        </div>
          {/* Product Info */}
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg mb-2 text-white">Product</span>
            <ul className="text-sm text-white space-y-1">
              <li><a href="#" className="hover:text-zinc-300 hover:underline">Bluvia-Neo</a></li>
              <li><a href="#" className="hover:text-zinc-300 hover:underline">Product view</a></li>
              <li><a href="#" className="hover:text-zinc-300 hover:underline">Key features</a></li>
            </ul>
        {/* ...existing code... */}
      </div>
      {/* Services Info */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg mb-2 text-white">Services</span>
        <ul className="text-sm text-white space-y-1">
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Design Lab</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">About the service</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Services Offered</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Why Design Lab</a></li>
        </ul>
      </div>
      {/* Resources Info */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg mb-2 text-white">Resources</span>
        <ul className="text-sm text-white space-y-1">
          <li><a href="#" className="hover:text-zinc-300 hover:underline">User manuals</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Compliance guideline</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">FAQs</a></li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Blogs & insights</a></li>
        </ul>
      </div>
      </div>
      <hr className="border-t border-[#ffffff] mt-8 mb-4" />
      <div className="w-full flex justify-center items-center pb-2">
        <span className="text-[#ffffff] text-sm flex items-center">
          <span className="mr-1">&copy;</span> 2025 Medford Technologies All rights reserved
        </span>
      </div>
    </footer>
  )
}

export default Footer