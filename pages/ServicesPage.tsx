import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Layers, Video, Headphones, Shield, Clock, Award, Users } from "lucide-react"; // icons
import CardSwap, { Card } from '../components/CardSwap';
import { AnimatedTestimonials } from "../src/components/ui/animated-testimonials";
import ShinyText from '../components/ShinyText'; // Add ShinyText import

gsap.registerPlugin(ScrollTrigger);

// Cast to `any` to avoid strict TS prop checks
const ShinyTextComp: any = ShinyText as any;

// ---------------- HERO SECTION ----------------
const HeroSection = () => (
  <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute z-0 w-full h-full object-fill"
    >
      <source src="/videos/service.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-black opacity-60 z-1"></div>
    <div className="container mx-auto px-8 text-center relative z-10 transform translate-y-28">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold opacity-90"
      >
        <ShinyTextComp
          text="M Design Lab"
          className="inline-block text-white"
          speed={4}
          shimmerColor="#a855f7" // Purple color for the shine effect
        />
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-purple-200 opacity-80"
      >
        From Visionary Sketch to Market-Ready Product
      </motion.p>
    </div>
  </div>
);

// ---------------- ABOUT SECTION ----------------
const AboutSection = () => (
  <section id="about" className="min-h-screen bg-black flex items-center scroll-mt-24">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Image on the left */}
      <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
        <img
          src="imgs/mdl.jpg"
          alt="Car"
          className="max-w-lg w-full h-auto drop-shadow-lg rounded-xl"
        />
      </div>
      {/* Text content on the right */}
  <div className="md:w-1/2 w-full text-left flex flex-col justify-center">
        <h3 className="text-2xl font-light text-gray-300 mb-3">About Medford Design Lab</h3>
        <div className="text-3xl md:text-5xl font-extrabold text-white mb-5">
          <div className="mb-4">Powering MedTech</div>
          <div className="mb-2">
            <span className="text-white px-2 py-1 rounded " style={{backgroundColor: '#6D3ECB'}}>Innovation,</span>{" "}
            One Prototype at a Time
            <span style={{color: '#6D3ECB'}}>.</span>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl">
          M Design Lab is the dedicated innovation wing of Medford Technologies, created to bridge the gap between visionary ideas and market-ready medical technology solutions.
          Our approach combines deep industry expertise, precise engineering, and market-driven insights, empowering startups, research labs, hospitals, and founders to develop breakthrough medical technologies faster, safer, and more cost-effectively.
        </p>
        {/* Download Brochure Button below text */}
        <a
          href="/docs/DL_BROUCHER.pdf"
          download
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-white font-semibold rounded-lg shadow transition-colors w-fit"
          style={{backgroundColor: '#6D3ECB'}}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5A2F9E'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6D3ECB'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          Download Brochure
        </a>
      </div>
    </div>
  </section>
);

// ---------------- SERVICES DATA ----------------
const services = [
  {
    icon: <Car className="w-10 h-10 text-purple-600" />,
    title: "Consulting",
    desc: "Expert advice to help you streamline workflows and adopt the right solutions.",
  },
  {
    icon: <Layers className="w-10 h-10 text-purple-600" />,
    title: "Strategy",
    desc: "We craft strategies tailored to your goals for impactful digital presence.",
  },
  {
    icon: <Video className="w-10 h-10 text-purple-600" />,
    title: "Video Production",
    desc: "End-to-end video creation services to engage and inspire audiences.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-purple-600" />,
    title: "Support",
    desc: "Dedicated support ensuring smooth delivery and lasting client success.",
  },
];

// ---------------- TESTIMONIALS DATA ----------------
const testimonials = [
  {
    quote: "Early-stage innovators often have to juggle multiple vendors, consultants, and service providers, leading to delays and misaligned outcomes.",
    name: "Fragmented Support Ecosystem",
    designation: "",
    src: "imgs/ch1.jpg"
  },
  {
    quote: "Even with a solid concept, bridging the gap between lab design and scalable manufacturing can be costly and technically challenging.",
    name: "Technology-to-Production Gap",
    designation: "",
    src: "imgs/ch2.jpg"
  },
  {
    quote: "Many projects move forward without solid market research, resulting in products that miss real-world needs or fail commercially.",
    name: "Lack of Market Validation",
    designation: "",
    src: "imgs/ch3.jpg"
  },
];

// ---------------- CUSTOM CARD SWAP COMPONENT ----------------
const CustomCardSwap: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    {
      icon: <Layers className="w-12 h-12" style={{color: '#6D3ECB'}} />,
      title: "Rapid Prototyping",
      description: "Fast turnaround from idea to functional model with precision engineering and market validation."
    },
    {
      icon: <Users className="w-12 h-12" style={{color: '#6D3ECB'}} />,
      title: "Clinical Validation", 
      description: "Insights from medical experts for real-world relevance and regulatory compliance."
    },
    {
      icon: <Shield className="w-12 h-12" style={{color: '#6D3ECB'}} />,
      title: "Regulatory Support",
      description: "Comprehensive guidance for navigating complex compliance standards and approval processes."
    },
    {
      icon: <Award className="w-12 h-12" style={{color: '#6D3ECB'}} />,
      title: "IP Protection",
      description: "Strategic intellectual property safeguarding to protect your innovative solutions."
    },
    {
      icon: <Clock className="w-12 h-12" style={{color: '#6D3ECB'}} />,
      title: "Scalable Design",
      description: "Built for manufacturability and future growth with sustainable development practices."
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, cards.length]);

  const getCardStyle = (index: number) => {
    const isActive = index === currentCard;
    const offset = (index - currentCard + cards.length) % cards.length;
    
    if (isActive) {
      return {
        transform: 'translateY(0px) translateX(0px) scale(1) rotateY(0deg)',
        zIndex: 10,
        opacity: 1,
      };
    } else if (offset === 1) {
      return {
        transform: 'translateY(8px) translateX(8px) scale(0.95) rotateY(-5deg)',
        zIndex: 9,
        opacity: 0.8,
      };
    } else if (offset === 2) {
      return {
        transform: 'translateY(16px) translateX(16px) scale(0.9) rotateY(-10deg)',
        zIndex: 8,
        opacity: 0.6,
      };
    } else {
      return {
        transform: 'translateY(24px) translateX(24px) scale(0.85) rotateY(-15deg)',
        zIndex: 7,
        opacity: 0.4,
      };
    }
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto mt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Card Stack Container */}
      <div className="relative h-96 perspective-1000">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border-2 p-10 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{
              borderColor: '#6D3ECB',
              ...getCardStyle(index),
            }}
            animate={getCardStyle(index)}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            onClick={() => setCurrentCard(index)}
          >
            {/* Icon */}
            <div className="p-5 rounded-full mb-8" style={{backgroundColor: 'rgba(109, 62, 203, 0.1)'}}>
              {card.icon}
            </div>
            
            {/* Title */}
            <h4 className="text-2xl font-bold mb-6" style={{color: '#6D3ECB'}}>
              {card.title}
            </h4>
            
            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed font-medium">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              index === currentCard ? 'focus:ring-purple-500' : ''
            }`}
            style={{
              backgroundColor: index === currentCard ? '#6D3ECB' : '#E5E7EB',
              transform: index === currentCard ? 'scale(1.3)' : 'scale(1)',
            }}
            onClick={() => setCurrentCard(index)}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      {/* Card Counter */}
      <div className="text-center mt-4">
        <span className="text-sm font-medium text-gray-500">
          {currentCard + 1} of {cards.length}
        </span>
      </div>
    </div>
  );
};

// ---------------- SERVICES SECTION ----------------
const ServicesSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-12">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side content */}
        <div className="md:pr-12">
          <h3 className="text-2xl font-light text-gray-500 mb-4">Our Services</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Concept-to-Prototype Development
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We specialize in transforming innovative MedTech ideas into market-ready prototypes with{" "}
            <span className="text-white px-3 py-1 rounded-lg font-semibold" style={{backgroundColor: '#6D3ECB'}}>
              speed and precision
            </span>
            . From initial concept sketches to functional models, our expert team integrates clinical insights, engineering excellence, and regulatory guidance — ensuring every product is designed for safety, compliance, and manufacturability.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Empower your innovation with our streamlined, research-backed development process that bridges the gap between visionary ideas and market success.
          </p>
        </div>
        
        {/* Right side Custom Card Swap */}
        <div className="flex justify-center">
          <CustomCardSwap />
        </div>
      </div>
    </section>
  );
};

// ---------------- BUSINESS SECTION ----------------
const BusinessSection = () => (
  <section className="min-h-screen bg-white flex items-center py-20">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
      {/* Left side content */}
      <div className="flex flex-col justify-center px-12">
        <h3 className="text-2xl font-light text-gray-500 mb-3">THE CHALLENGES WE SEE</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Bringing a  {" "}
          <span className="bg-purple-200 px-2 rounded">MedTech idea</span>{" "}
          to life isn’t easy.
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            MedTech innovators face hurdles like validating ideas with clinical insights, accessing design expertise, managing costly prototypes and long timelines, securing reliable manufacturing, and navigating IP protection and regulations
          </p>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Strategic business consulting</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Digital transformation solutions</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <span className="text-purple-600 text-xl">•</span>
            <span className="text-lg">Innovation-driven growth strategies</span>
          </div>
        </div>
      </div>

      {/* Right side with animated testimonials */}
      <div className="flex w-full h-full">
        <div 
          className="w-full h-[500px] my-8 bg-purple-600 relative overflow-hidden"
          style={{
            backgroundColor: '#6D3ECB',
            borderRadius: "40px 0 0 40px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full h-full flex items-center justify-center text-white">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- WHY CHOOSE US SECTION ----------------
const WhyChooseUs = () => (
  <section className="min-h-screen bg-gray-50 flex items-center py-20">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      {/* Image on the left */}
      <div className="md:w-1/2 w-full">
        <img
          src="imgs/s.jpg"
          alt="Medical Technology"
          className="rounded-2xl w-full h-auto shadow-2xl"
        />
      </div>

      {/* Content on the right */}
      <div className="md:w-1/2 w-full">
        <h3 className="text-2xl font-light text-gray-500 mb-3">Who We Work With</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          Empowering Innovators Across the {" "}
          <span className="bg-purple-200 px-2 rounded">MedTech Ecosystem</span>{" "}
         
        </h2>
        <p className="text-lg text-gray-700 mb-8"> We partner with forward-thinking organizations, offering guidance and support to bring medical innovations to life.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Partner 1 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Layers className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl  text-gray-900">
                MedTech Startups
              </h4>
            </div>
            
          </div>

          {/* Partner 2 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Video className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl  text-gray-900">
                Research Labs & Academic Institutions
              </h4>
            </div>
            
          </div>

          {/* Partner 3 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl  text-gray-900">
                Hospital Innovation Teams
              </h4>
            </div>
            
          </div>

          {/* Partner 4 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl  text-gray-900">
                Healthcare Innovators & Founders
              </h4>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------- MAIN PAGE ----------------
const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BusinessSection />
      <WhyChooseUs />
    </div>
  );
};

export default ServicesPage;
