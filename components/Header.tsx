
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Logo = () => (
  <img src="/imgs/logo.png" alt="MedFord Technologies Logo" className="w-9 h-9 sm:w-8 sm:h-8" />
);


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCareerPopupOpen, setIsCareerPopupOpen] = useState(false);
  const [careerForm, setCareerForm] = useState({
    name: '',
    jobType: 'intern',
    role: '',
    number: '',
    email: '',
    acceptTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close mobile menu on scroll
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const linkVariants = {
    rest: { y: 0 },
    hover: { y: -2 },
  };

  const hoverPillVariants = {
      rest: { scale: 0, opacity: 0 },
      hover: { scale: 1, opacity: 1 },
  };

  const handleCareerFormChange = (field: string, value: string | boolean) => {
    setCareerForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.acceptTerms) {
      setSubmitStatus({
        type: 'error',
        message: 'Please accept the terms and conditions to continue.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(careerForm),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '🎉 Application submitted successfully! We will review it and get back to you within 3-5 business days.'
        });
        // Reset form
        setCareerForm({
          name: '',
          jobType: 'intern',
          role: '',
          number: '',
          email: '',
          acceptTerms: false
        });
        // Auto-close popup after 3 seconds
        setTimeout(() => {
          setIsCareerPopupOpen(false);
          setSubmitStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'There was an error submitting your application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting career form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
  <motion.header 
    variants={{
      visible: { y: 0 },
      hidden: { y: "-150%" },
    }}
    animate={hidden ? "hidden" : "visible"}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="fixed top-0 left-0 right-0 z-[9999] pt-2 sm:pt-4 px-3 sm:px-6 lg:px-8"
  >
  <div className="relative max-w-3xl md:max-w-5xl mx-auto">
<nav className="flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 px-4 sm:px-6 py-2 sm:py-3">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-800 hover:text-primary transition-colors">
            <Logo />
            {/* show app name on mobile as smaller text, larger on sm+ */}
            <span className="text-sm sm:text-base">MedFord Technologies</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <motion.div
                  key={link.name}
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative"
              >
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={(e) => {
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
                  }} 
                  className="relative block px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
                >
                  {location.pathname === link.path && (
                    <motion.span 
                      className="absolute inset-0 bg-white rounded-full -z-10" 
                      layoutId="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative ${
                    location.pathname === link.path ? 'text-purple-600' : ''
                  }`}>{link.name}</span>
                </Link>
                {location.pathname !== link.path && (
                    <motion.span
                        variants={hoverPillVariants}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="absolute inset-0 bg-white/60 rounded-full -z-10"
                    />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-1.5 rounded-full hover:bg-white/50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] left-0 right-0 md:hidden text-purple-500 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20"
            >
              <div className="flex flex-col items-stretch py-2">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={(e) => {
                      if (link.path === '#career') {
                        e.preventDefault();
                        setIsOpen(false);
                        setIsCareerPopupOpen(true);
                      } else if (link.path === '/') {
                        // Handle Home navigation
                        setIsOpen(false);
                        if (location.pathname === '/') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        // If on different page, let Link handle navigation
                      } else if (link.path.startsWith('/#')) {
                        e.preventDefault();
                        const targetId = link.path.substring(2);
                        setIsOpen(false);
                        
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
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="px-6 py-3 text-gray-700 hover:text-purple-600 hover:bg-white/50 transition-colors duration-300 text-base text-center"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                {/* Status Message */}
                {submitStatus.type && (
                  <div className={`mb-4 p-4 rounded-lg border-l-4 ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-50 text-green-800 border-l-green-500 border border-green-200' 
                      : 'bg-red-50 text-red-800 border-l-red-500 border border-red-200'
                  }`}>
                    <div className="flex items-start">
                      {submitStatus.type === 'success' ? (
                        <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <div>
                        <p className="font-medium text-sm leading-relaxed">{submitStatus.message}</p>
                      </div>
                    </div>
                  </div>
                )}

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
                    id="acceptTerms"
                    checked={careerForm.acceptTerms}
                    onChange={(e) => handleCareerFormChange('acceptTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I accept the terms and conditions
                  </label>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-300 mt-6 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    'Apply'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
