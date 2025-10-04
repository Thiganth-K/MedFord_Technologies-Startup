import { Timeline } from "../ui/timeline";
import * as React from 'react';
import { motion, Variants, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FaQuestionCircle, FaTools, FaShieldAlt, FaCertificate, FaHandshake, FaLifeRing } from 'react-icons/fa';

import { SERVICES_DATA, PRODUCTS_DATA } from '../constants';
import type { Product } from '../types';
import {
    HeartIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    CommentIcon,
    ArrowPathIcon,
    ArrowUpTrayIcon,
    BookmarkIcon,
    ArrowRightIcon
} from '../components/Icons';
import OurTeam from '../components/OurTeam'; // Adjust path if needed
import BlurText from '../components/BlurText'; // Add this import
import RotatingText from '../components/RotatingText';
import ShinyText from '../components/ShinyText'; // Add ShinyText import

// Some component files are JS; cast to `any` to avoid strict TS prop checks here
const RotatingTextComp: any = RotatingText as any;
const BlurTextComp: any = BlurText as any;
const ShinyTextComp: any = ShinyText as any;


import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AnimatedText: React.FC<{ text: string; className?: string; el?: string }> = ({ text, className, el = 'h1' }) => {
    const words = text.split(" ");
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };
    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    const MotionEl = motion[el];

    return (
        <MotionEl
            style={{ overflow: 'hidden' }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </MotionEl>
    );
};

const HeroSection = () => (
  <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none">
      <source src="/videos/home_page.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          {/* Force single-line layout and responsive scaling */}
          <div
            className="text-glow flex items-center justify-center gap-2 whitespace-nowrap overflow-visible"
            style={{ fontWeight: 800, fontSize: 'clamp(18px, 4.5vw, 44px)', lineHeight: 1.3, padding: '4px 0' }}
          >
            <ShinyTextComp
              text="Revolutionizing Hospital Hygiene with"
              className="inline-block text-white"
              speed={4}
            />
            <RotatingTextComp
              texts={["Precision", "Innovation", "Excellence"]}
              mainClassName="bg-purple-600 backdrop-sm px-4 sm:px-6 py-1 sm:py-2 rounded-lg border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              elementLevelClassName="text-white"
              rotationInterval={3000}
              splitBy="words"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
            />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-1 text-gray-200 italic mx-auto"
          style={{
            fontSize: 'clamp(13px, 2.2vw, 20px)',
            maxWidth: 'min(720px, 90%)',
            lineHeight: 1.2,
          }}
        >
          <span className="whitespace-nowrap">
            Medford technologies is where Medtech innovation meets precision engineering
          </span>
        </motion.p>
      </div>
    </div>
  </div>
);

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string; noPadding?: boolean }> = ({ children, className = '', id, noPadding = false }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const variants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.3 } },
    };

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${noPadding ? '' : 'py-20'} px-0${className}`}
    >
      {children}
    </motion.section>
  );
};


const AboutSection = () => {
    const imageVariant: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (custom: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: custom * 0.1,
            }
        })
    };

    return (
        <Section id="about">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Left Column: Text */}
                    <div className="text-left">
                        <p className="text-md font-semibold text-primary uppercase tracking-widest">ABOUT US</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 leading-tight">
                            Shaping tomorrow's<span className="bg-primary/10 px-2 py-1 rounded-md text-primary-light">healthcare,</span> today.
                        </h2>
                        <p className="mt-6 text-xl text-gray-600">
At Medford Technologies, we provide hospitals and labs with advanced disinfectors and sterilization solutions built on innovation, safety, and reliability. Our expert team delivers affordable, efficient, and globally competitive technologies that protect patients, empower healthcare professionals, and drive a safer, germ-free future.

</p>
                    </div>
                    
                    {/* Right Column: Image Grid */}
                    <div className="grid grid-cols-5 grid-rows-4 gap-4 h-[300px] sm:h-[450px] md:h-auto md:aspect-square">
                        {/* Big Image */}
                        <motion.div 
                            custom={0}
                            variants={imageVariant}
                            className="col-span-3 row-span-3 bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <img 
                                src="/imgs/img1.jpg" 
                                alt="Doctor with tablet" 
                                className="w-full h-full object-cover" 
                            />
                        </motion.div>
                        
                        {/* Right Image 1 */}
                        <motion.div 
                            custom={1}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-1 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="/imgs/img2.png" alt="Scientist in lab" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Right Image 2 */}
                        <motion.div 
                            custom={2}
                            variants={imageVariant}
                            className="col-start-4 col-span-2 row-start-2 row-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <img src="/imgs/img3.png" alt="Medical equipment" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Bottom Image 1 */}
                        <motion.div 
                            custom={3}
                            variants={imageVariant}
                            className="col-start-1 col-span-2 row-start-4 bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img src="/imgs/img4.png" alt="Lab vials" className="w-full h-full object-cover" />
                        </motion.div>
                        
                        {/* Bottom Image 2 */}
                        <motion.div 
                            custom={4}
                            variants={imageVariant}
                            className="col-start-3 col-span-2 row-start-4 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <img src="/imgs/img5.png" alt="Microscope view" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const ProductsSection = () => {
    const featuredProduct = PRODUCTS_DATA[0];

    const textVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, x: 50, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <Section className="min-h-screen flex items-center">
            <div className="w-full px-6 sm:px-12 lg:px-16">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Product</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mt-6 mb-8"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the cutting-edge of medical technology with our flagship product.</p>
                </div>
                <div className="max-w-full mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        variants={textVariants}
                        className="text-left space-y-4 px-4"
                    >
                        <p className="text-base font-semibold text-primary uppercase tracking-widest">{featuredProduct.name}</p>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                            {featuredProduct.description}
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                            The Bluvia Neo is a next-generation solution for hospitals, clinics, laboratories, and the pharmaceutical industry, delivering unmatched hygiene, safety, and efficiency. Equipped with a 120-liter chamber and the capacity to process 120–150 medical instruments per cycle, it integrates precision cleaning, thermal disinfection, and advanced HEPA-filtered drying — setting a new global benchmark in medical reprocessing technology.
                        </p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Learn More
                            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        variants={imageVariants}
                        className="flex justify-center lg:justify-end"
                    >
                        <img
                            src="/imgs/prd1.jpg"
                            alt={featuredProduct.name}
                            className="rounded-2xl shadow-2xl w-full h-auto min-h-[500px] object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

const ServicesSection = () => (
  <Section className="px-0 m-0 min-h-screen flex items-center" noPadding>
    <div className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
      <video
        src="/videos/DESIGN_LAB-2.mp4"
        aria-label="Service Wing video"
        className="absolute z-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 z-5"></div>
      
      {/* Content Overlay */}
      <div className="absolute z-10 bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="#/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-900 via-blue-600 to-violet-600 hover:from-blue-800 hover:via-blue-500 hover:to-violet-500 text-white font-bold py-4 px-10 rounded-full shadow-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1 border border-blue-400/30"
          >
            Explore More!!
            <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </div>
  </Section>
);

const INVESTOR_LOGOS = [
  '/imgs/investor1.png',
  '/imgs/investor2.jpg',
  '/imgs/investor3.png',
  '/imgs/investor1.png',
  '/imgs/investor2.jpg',
  '/imgs/investor3.png',
];

const InvestorsSection = () => (
    <Section id="investors" className="bg-light">
        <div className="container mx-auto">
            <div className="text-center  max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-800">Our Investors</h2>
                <p className="mt-4 text-lg text-purple-800">Who trust in our journey</p>
            </div>
            <div className="mt-12 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 40,
                        repeat: Infinity,
                    }}
                 >
                    {[...INVESTOR_LOGOS, ...INVESTOR_LOGOS].map((logo, index) => (
                        <div key={index} className="flex-shrink-0 mx-8" style={{ width: '200px', height: '100px' }}>
                            <img 
                                src={logo} 
                                alt={`Investor logo ${index + 1}`} 
                                className="h-full w-full object-contain transition-transform duration-300 hover:scale-110" 
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </Section>
);

const JOURNEY_DATA = [
  {
    year: 2022,
    title: "Foundation",
    content: "Founded Medford Technologies with a vision to revolutionize hospital sterilization.",
    highlights: ["Visionary beginning", "Focus on hospital sterilization", "Set the foundation for innovation"]
  },
  {
    year: 2023,
    title: "Prototype Development",
    content: "Developed the first working prototype of our advanced disinfector.",
    highlights: ["First functional prototype", "Advanced disinfector technology", "Proof of concept achieved"]
  },
  {
    year: 2024,
    title: "Recognition & Funding",
    content: "Recognized as a DPIIT Startup, marking a major milestone in our growth journey. Secured a total investment of ₹90 lakhs to scale R&D and manufacturing.",
    highlights: ["Recognition", "Investment", "Growth"]
  },
  {
    year: 2025,
    title: "Launch & Impact",
    content: "Gearing up for our official launch in October 2025, introducing BLUVIA Neo, designed to transform sterilization practices.",
    highlights: ["Launch", "BLUVIA", "Innovate"]
  }
];

const OurJourneySection = () => {
  const [currentYearIndex, setCurrentYearIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentYearIndex((prev) => (prev + 1) % JOURNEY_DATA.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentData = JOURNEY_DATA[currentYearIndex];
  const currentYear = currentData.year;
  const yearString = currentYear.toString();
  const firstTwoDigits = yearString.slice(0, 2);
  const lastTwoDigits = yearString.slice(2);

  return (
    <Section id="journey" className="bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-4"
          >
            OUR JOURNEY
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
          >
            Milestones That <span className="bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">Define Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base text-gray-500 font-medium"
          >
            The steps that shaped Medford's path in healthcare technology
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
          >
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Year Counter */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center lg:items-end"
          >
            <div className="relative">
              <div className="text-8xl md:text-9xl font-black text-gray-200 select-none">
                {firstTwoDigits}
                <motion.span
                  key={currentYearIndex}
                  initial={{ y: 50, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: -90 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.6 
                  }}
                  className="inline-block bg-gradient-to-b from-purple-600 to-purple-800 bg-clip-text text-transparent"
                  style={{ transformOrigin: 'center bottom' }}
                >
                  {lastTwoDigits}
                </motion.span>
              </div>
            </div>

            {/* Timeline dots */}
            <div className="flex space-x-3 mt-8">
              {JOURNEY_DATA.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentYearIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentYearIndex 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentYearIndex}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100"
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  layoutId="title"
                >
                  {currentData.title}
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed mb-6"
                  layoutId="content"
                >
                  {currentData.content}
                </motion.p>

                <motion.div 
                  className="space-y-3"
                  layoutId="highlights"
                >
                  <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {currentData.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-purple-600 rounded-full" />
                        <span className="text-gray-700">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => setCurrentYearIndex((prev) => (prev - 1 + JOURNEY_DATA.length) % JOURNEY_DATA.length)}
                className="p-3 bg-white rounded-full shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transform group-hover:-translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                onClick={() => setCurrentYearIndex((prev) => (prev + 1) % JOURNEY_DATA.length)}
                className="p-3 bg-white rounded-full shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transform group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};



const SOCIAL_POSTS = [
  {
    platform: 'twitter',
    avatar: '/imgs/FB.webp',
    username: 'MedFord Technologies',
    handle: '@MedFord',
    caption: 'We\'re happy to share that Medford Technologies has been featured in Siliconlndia Startup City magazine:      "Medford Technologies: Innovating Sterilization Systems for a Safer, Healthier Future." This feature highlights our journey in redefining sterilization and infection-control solutions, and our mission to build safer healthcare environments through innovation and precision engineering.',
    postImage: '/imgs/sm1.png',
    likes: '1K',
    comments: '8',
    retweets: '25',
  },
  {
    platform: 'instagram',
    avatar: '/imgs/ins.jpg',
    username: 'medford_technologies',
    caption: 'Medverse 2025! Our very own Co-founder, Ms.Tharany is joining a power-packed panel on: “The Next Frontier: Why Tier 2/3 Cities Hold the Key to India’s Healthtech Future” Happy to watch her represent Medford!',
    postImage: '/imgs/sm2.jpg',
    likes: '300',
    comments: '12',
  },
  {
    platform: 'linkedin',
    avatar: '/imgs/l.jpg',
    username: 'MedFord Technologies',
    followers: '1,280 followers',
    caption: '✨A Proud Moment for Medford Technologies ✨ We are thrilled to officially unveil M Design Lab by Medford Technologies at Medverse.2025, Salem, in the presence of the visionary Mr. C Sivasankaran sir, Founder of Aircel — a leader who continues to inspire countless innovators with his journey and achievements.',
    postImage: '/imgs/sm3.jpg',
    likes: '91',
    comments: '12',
    reposts: '10',
  },
];

const SocialMediaSection = () => {
  const [postIndex, setPostIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPostIndex((prevIndex) => (prevIndex + 1) % SOCIAL_POSTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/medford_technologies/',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/profile.php?id=61578420641821',
      color: 'bg-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/company/medford/',
      color: 'bg-blue-700'
    }
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const currentPost = SOCIAL_POSTS[postIndex];

  const renderPost = () => {
    switch (currentPost.platform) {
      case 'twitter':
        return (
          <div className="font-sans text-sm text-gray-800 p-3 h-full flex flex-col">
            <div className="flex items-start space-x-3 mt-4"> {/* Added margin-top */}
              <img
                src={currentPost.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="mt-2"> {/* Added margin-top */}
                <p className="font-bold">{currentPost.username}</p>
                <p className="text-gray-500">{currentPost.handle}</p>
              </div>
            </div>
            <p className="my-3">{currentPost.caption}</p>
            <img
              src={currentPost.postImage}
              alt="post"
              className="rounded-2xl border border-gray-200 mt-1"
            />
            <div className="mt-auto pt-3 flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                <p>{currentPost.comments}</p>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowPathIcon className="w-5 h-5" />
                <p>{currentPost.retweets}</p>
              </div>
              <div className="flex items-center space-x-1">
                <HeartIcon className="w-5 h-5" />
                <p>{currentPost.likes}</p>
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpTrayIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      case 'instagram':
        return (
          <div className="font-sans text-sm text-gray-800 h-full flex flex-col">
            <div className="flex items-center space-x-3 p-3 border-b border-gray-200 mt-4"> {/* Added margin-top */}
              <img
                src={currentPost.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full"
              />
              <p className="font-semibold mt-2">{currentPost.username}</p> {/* Added margin-top */}
            </div>
            <img
              src={currentPost.postImage}
              alt="post"
              className="w-full aspect-square object-cover"
            />
            <div className="px-3 py-2 flex-grow flex flex-col">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <HeartIcon className="w-7 h-7" />
                  <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
                  <ArrowUpTrayIcon className="w-7 h-7 -rotate-90" />
                </div>
                <BookmarkIcon className="w-7 h-7" />
              </div>
              <p className="font-semibold mt-2">{currentPost.likes} likes</p>
              <p className="mt-1">
                <span className="font-semibold">{currentPost.username}</span>{' '}
                {currentPost.caption}
              </p>
            </div>
          </div>
        );
      case 'linkedin':
        return (
          <div className="font-sans text-xs text-gray-700 bg-gray-50 h-full flex flex-col">
            <div className="p-3 mt-4"> {/* Added margin-top */}
              <div className="flex items-start space-x-2">
                <img
                  src={currentPost.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div className="mt-2"> {/* Added margin-top */}
                  <p className="font-bold text-sm text-gray-800">
                    {currentPost.username}
                  </p>
                  <p>{currentPost.followers}</p>
                </div>
              </div>
              <p className="my-2 text-sm text-gray-800">{currentPost.caption}</p>
            </div>
            <img
              src={currentPost.postImage}
              alt="post"
              className="w-full object-cover"
            />
            <div className="px-3 py-1 flex justify-between items-center border-b border-gray-200 text-gray-500">
              <p>{currentPost.likes} Likes</p>
              <p>
                {currentPost.comments} comments • {currentPost.reposts} reposts
              </p>
            </div>
            <div className="mt-auto grid grid-cols-4 text-gray-600 font-semibold text-sm">
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <HeartIcon className="w-5 h-5" />
                <p>102</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
                <p>8</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ArrowPathIcon className="w-5 h-5" />
                <p>2</p>
              </div>
              <div className="flex items-center justify-center space-x-1 py-2 hover:bg-gray-200">
                <ArrowUpTrayIcon className="w-5 h-5" />
                <p>9</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Section id="socials">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="text-left"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">SOCIAL MEDIA</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3 leading-tight">Stay Connected With Our Latest Updates</h2>
            <p className="mt-6 text-lg text-gray-600">
              Follow us on our social channels to get the latest news on product launches, industry insights, and our ongoing mission to improve global healthcare safety.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6 mt-8">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.button
                    key={social.name}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(social.url)}
                    className={`${social.color} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <IconComponent size={32} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="flex flex-col items-center justify-center py-10 md:py-0"
          >
            {/* Status Bar */}
            <div className="absolute top-0 left-0 w-full bg-gray-900 text-white text-xs py-1 px-4 flex justify-between items-center md:hidden">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <div className="flex items-center space-x-2">
                <span>75%</span>
                <div className="w-4 h-2 bg-white rounded-sm relative">
                  <div className="absolute inset-0 bg-green-500" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-80 h-[650px] bg-gray-900 rounded-[40px] border-[10px] border-gray-900 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-lg z-20"></div>
              <div className="w-full h-full bg-white rounded-[30px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={postIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full h-full"
                  >
                    {renderPost()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Status bar dots */}
            <div className="flex space-x-2 mt-4">
              {SOCIAL_POSTS.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full ${postIndex === idx ? 'bg-primary' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};


const BLOG_POSTS = [
  {
    id: 1,
    title: 'Revolutionizing Medical Hygiene',
    date: 'September 10, 2025',
    excerpt: 'Discover how MedFord is transforming healthcare with cutting-edge technology.',
    slug: 'revolutionizing-medical-hygiene',
    image: '/imgs/blog1.png',
  },
  {
    id: 2,
    title: 'The Future of Sterilization',
    date: 'August 25, 2025',
    excerpt: 'Learn about the latest advancements in sterilization technology.',
    slug: 'future-of-sterilization',
    image: '/imgs/blog2.jpg',
  },
  {
    id: 3,
    title: 'Innovative Solutions for Healthcare',
    date: 'July 15, 2025',
    excerpt: 'How MedFord is addressing modern healthcare challenges with innovation.',
    slug: 'innovative-healthcare-solutions',
    image: '/imgs/blog3.jpg',
  },
];

const BlogSection = () => (
  <Section id="blog" className="bg-light">
    <div className="container mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">From Our Blog</h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-4 "></div>
        <p className="text-lg text-gray-600">Stay updated with the latest news, articles, and insights from the medical technology industry.</p>
      </div>
      <div className="mt-12 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          {[...BLOG_POSTS, ...BLOG_POSTS].map((post, index) => (
            <div key={index} className="flex-shrink-0 mx-8" style={{ width: '350px', height: '420px' }}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden group h-full flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mt-2 text-gray-600">{post.excerpt}</p>
                  <a href={`#/blog/${post.slug}`} className="mt-4 group inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-light">
                    Read More
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </Section>
);

const FAQ_DATA = [
  {
    id: 1,
    question: "What does Medford Technologies do?",
    answer: "Medford Technologies develops advanced medical washing disinfectors and sterilizers for hospitals, laboratories, and disinfectant centers to ensure effective infection control."
  },
  {
    id: 2,
    question: "What is M Design Lab?",
    answer: (
      <span>
        M Design Lab is our in-house design and development hub. From concept design and prototyping to product testing and compliance, it ensures innovation, safety, and efficiency in every product we deliver. Contact us at{' '}
        <a href="mailto:designlab@medford.in" className="text-purple-600 hover:text-purple-800 underline font-medium">
          designlab@medford.in
        </a>.
      </span>
    )
  },
  {
    id: 3,
    question: "Are your products certified and compliant?",
    answer: "Yes. All Medford products are developed in line with international quality and safety standards, complying with Indian medical device regulations and global certifications."
  },
  {
    id: 4,
    question: "Do you provide installation, training, and after-sales service?",
    answer: "Yes, we provide complete installation assistance, user training, preventive maintenance, breakdown support, spare parts replacement, and service contracts tailored to customer needs."
  },
  {
    id: 5,
    question: "How can I request a demo or purchase your products?",
    answer: (
      <span>
        You can request a demo or connect with our sales team by filling out the Get a Solution form on our website or by emailing{' '}
        <a href="mailto:support@medford.in" className="text-purple-600 hover:text-purple-800 underline font-medium">
          support@medford.in
        </a>.
      </span>
    )
  },
  {
    id: 6,
    question: "How do I contact customer support?",
    answer: (
      <span>
        You can reach our support team at{' '}
        <a href="tel:+919080705892" className="text-purple-600 hover:text-purple-800 underline font-medium">
          +91 90807 05892
        </a>{' '}
        or email{' '}
        <a href="mailto:support@medford.in" className="text-purple-600 hover:text-purple-800 underline font-medium">
          support@medford.in
        </a>. We are happy to assist you.
      </span>
    )
  }
];

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Section id="faq" className="bg-gradient-to-br from-purple-50 to-white">
      {/* Top separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800 to-transparent mb-16"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 leading-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-600"
          >
            Clear answers to help you understand our solutions better.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 md:gap-6">
            {FAQ_DATA.map((faq, index) => {
              const isExpanded = expandedItems.includes(faq.id);
              
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-4 md:px-8 md:py-5 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4">
                        <div
                          className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          <MdExpandMore className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 pb-4 md:px-8 md:pb-5 border-t border-gray-100">
                      <div className="pt-4 text-gray-700 leading-relaxed text-base md:text-lg">
                        {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Our team is here to help you find the perfect solution for your healthcare facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@medford.in"
                className="inline-flex items-center gap-3 bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <MdEmail className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="tel:+919080705892"
                className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                <MdPhone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
        */}
      </div>
      
      {/* Bottom separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-800 to-transparent mt-16"></div>
    </Section>
  );
};

const ContactSection = () => (
  <Section id="contact" className="bg-[#f7f7fb] text-gray-900 scroll-mt-24">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
      {/* Left Info Panel */}
      <div className="pr-8">
        <p className="text-xs font-semibold text-purple-600 mb-2 tracking-widest">WE’RE HERE TO HELP YOU</p>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
          <span className="text-purple-700">Discuss</span> Your Sterilization & Hygiene Needs
        </h2>
        <p className="mt-4 text-base text-gray-600 mb-6">
          
          Reach out to us and our team will provide the right solution for your hospital, laboratory, or healthcare center.
        </p>
        <div className="flex items-center gap-3 mb-2">
          <MdEmail className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-medium">E-mail</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">
support@medford.in
</p>
        <div className="flex items-center gap-3 mb-2">
          <MdPhone className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-medium">Phone number</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">+91 90807 05892</p>
      </div>
      {/* Right Form Panel */}
      <form className="bg-white p-8 rounded-2xl shadow-xl text-gray-800 w-full max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-semibold mb-1 text-gray-700">Name</label>
          <input type="text" id="fullName" placeholder="Jane Smith" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block font-semibold mb-1 text-gray-700">Designation</label>
          <input type="text" id="designation" placeholder="e.g. Lab Manager" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">Email</label>
          <input type="email" id="email" placeholder="email@domain.com" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="organization" className="block font-semibold mb-1 text-gray-700">Organization</label>
          <input type="text" id="organization" placeholder="e.g. Medford Hospital" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="enquire" className="block font-semibold mb-1 text-gray-700">Enquire</label>
          <select id="enquire" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
            <option value="">Select enquiry type</option>
            <option value="product">Product</option>
            <option value="design-lab">Design Lab</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Message</label>
          <textarea id="message" rows={4} placeholder="Type your message" className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"></textarea>
        </div>
        <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          Get a Solution
        </button>
      </form>
    </div>
  </Section>
);


const HomePage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle scroll to section based on hash or state
    const hash = location.hash?.substring(1); // Remove the # symbol
    const sectionId = hash || location.state?.scrollTo || (location.state?.scrollToContact ? 'contact' : '');
    
    if (sectionId) {
      // Wait for components to render
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const timelineData = [
    {
      title: "2022-2023",
      content: (
        <div>
          <p className="mb-4 text-xl md:text-2xl  text-white">
            Founded Medford Technologies with a vision to revolutionize hospital sterilization.
          </p>
          <p className="mb-4 text-xl md:text-2xl  text-white">
            Developed the first working prototype of our advanced disinfector.
          </p>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div>
          <p className="mb-4 text-xl md:text-2xl  text-white">
            Recognized as a <span className="text-purple-300">DPIIT Startup</span>, marking a major milestone in our growth journey.
          </p>
          <p className="mb-4 text-xl md:text-2xl  text-white">
            Secured a total investment of <span className="text-purple-300">₹90 lakhs</span> to scale R&D and manufacturing.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-4 text-xl md:text-2xl  text-white">
            We are gearing up for our official launch in <span className="text-purple-300">October 2025</span>, introducing <span className="text-purple-300">BLUVIA Neo</span> designed to transform sterilization practices.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <OurTeam />
      <InvestorsSection />
      <OurJourneySection />
      <SocialMediaSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;