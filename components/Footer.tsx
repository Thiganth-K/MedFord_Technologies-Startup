import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Footer = () => {
  const [isCareerPopupOpen, setIsCareerPopupOpen] = useState(false);
  const [careerForm, setCareerForm] = useState({
    name: '',
    jobType: 'intern',
    role: '',
    number: '',
    email: '',
    acceptTerms: false
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleCareerFormChange = (field: string, value: string | boolean) => {
    setCareerForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    // Handle form submission here
    console.log('Career form submitted:', careerForm);
    alert('Application submitted successfully!');
    setIsCareerPopupOpen(false);
    setCareerForm({
      name: '',
      jobType: 'intern',
      role: '',
      number: '',
      email: '',
      acceptTerms: false
    });
  };

  const handleNavClick = (link: typeof NAV_LINKS[0], e: React.MouseEvent) => {
    if (link.path === '#career') {
      e.preventDefault();
      setIsCareerPopupOpen(true);
    } else if (link.path === '/') {
      // Handle Home navigation
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // If on different page, let Link handle navigation and scroll will happen in App.tsx useEffect
    } else if (link.path.startsWith('/#')) {
      e.preventDefault();
      const targetId = link.path.substring(2);
      
      if (location.pathname !== '/') {
        // If not on home page, navigate to home and set state
        navigate('/', { state: { scrollTo: targetId } });
      } else {
        // If on home page, scroll to section
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleServiceNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/services') {
      // Navigate to services page first, then scroll
      navigate('/services');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Already on services page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
          <span className="font-bold text-lg mb-2 text-white">Explore Us</span>
          <ul className="text-sm text-white space-y-1 mb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                {link.path.startsWith('/#') || link.path === '#career' || link.path === '/' ? (
                  <button
                    onClick={(e) => handleNavClick(link, e)}
                    className="hover:text-zinc-300 hover:underline text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-zinc-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
          {/* Product Info */}
          <div className="flex flex-col items-start">
            <span className="font-bold text-lg mb-2 text-white">Product</span>
            <ul className="text-sm text-white space-y-1">
              <li>
                <Link to="/products" className="hover:text-zinc-300 hover:underline">
                  BluviaNeo
                </Link>
              </li>
              <li>
                <Link to="/products#features" className="hover:text-zinc-300 hover:underline">
                  Key features
                </Link>
              </li>
            </ul>
        {/* ...existing code... */}
      </div>
      {/* Services Info */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg mb-2 text-white">Services</span>
        <ul className="text-sm text-white space-y-1">
          <li>
            <Link to="/services" className="hover:text-zinc-300 hover:underline">
              Design Lab
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => handleServiceNavClick('about', e)}
              className="hover:text-zinc-300 hover:underline text-left"
            >
              About the service
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleServiceNavClick('services', e)}
              className="hover:text-zinc-300 hover:underline text-left"
            >
              Our Services
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleServiceNavClick('challenges', e)}
              className="hover:text-zinc-300 hover:underline text-left"
            >
              The Challenges
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleServiceNavClick('partners', e)}
              className="hover:text-zinc-300 hover:underline text-left"
            >
              Who We Work With
            </button>
          </li>
          <li><a href="#" className="hover:text-zinc-300 hover:underline">Get My Free Demo</a></li>
        </ul>
      </div>
      {/* Resources Info */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-lg mb-2 text-white">Resources</span>
        <ul className="text-sm text-white space-y-1">
          <li>
            <a 
              href="/docs/User Manual.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline"
            >
              User manuals
            </a>
          </li>
          <li>
            <a 
              href="/docs/Privacy Policy.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a 
              href="/docs/Terms & Conditions.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline"
            >
              Terms and Conditions
            </a>
          </li>
          <li>
            <a 
              href="/docs/COMPLIANCE GUIDELINES.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline"
            >
              Compliance Guidelines
            </a>
          </li>
          <li>
            <a 
              href="/docs/Installation & Maintenance Guide.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-300 hover:underline"
            >
              Installation & Maintenance Guides
            </a>
          </li>


        </ul>
      </div>
      </div>
      <hr className="border-t border-[#ffffff] mt-8 mb-4" />
      <div className="w-full flex justify-center items-center pb-2">
        <span className="text-[#ffffff] text-sm flex items-center">
          <span className="mr-1">&copy;</span> 2025 Medford Technologies All rights reserved
        </span>
      </div>
      
      {/* Career Popup */}
      <AnimatePresence>
        {isCareerPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCareerPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Career Application</h2>
                <button
                  onClick={() => setIsCareerPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleCareerSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={careerForm.name}
                    onChange={(e) => handleCareerFormChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                {/* Job Type Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    value={careerForm.jobType}
                    onChange={(e) => handleCareerFormChange('jobType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="intern">Intern</option>
                    <option value="job">Job</option>
                  </select>
                </div>
                
                {/* Role Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={careerForm.role}
                    onChange={(e) => handleCareerFormChange('role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter desired role"
                  />
                </div>
                
                {/* Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={careerForm.number}
                    onChange={(e) => handleCareerFormChange('number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                  <input
                    type="email"
                    required
                    value={careerForm.email}
                    onChange={(e) => handleCareerFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                
                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="acceptTermsFooter"
                    checked={careerForm.acceptTerms}
                    onChange={(e) => handleCareerFormChange('acceptTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="acceptTermsFooter" className="text-sm text-gray-700">
                    I accept the terms and conditions
                  </label>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 mt-6"
                >
                  Apply
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer