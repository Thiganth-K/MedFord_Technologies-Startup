
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Logo = () => (
  <img src="/imgs/logo.png" alt="MedFord Technologies Logo" className="w-9 h-9 sm:w-8 sm:h-8" />
);


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                    if (link.path.startsWith('/#')) {
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
                      if (link.path.startsWith('/#')) {
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
    </motion.header>
  );
};

export default Header;
