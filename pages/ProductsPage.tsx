"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from "../components/Icons";
import { Lens } from "../components/ui/lens";
import ShinyText from '../components/ShinyText'; // Add ShinyText import

// Cast to `any` to avoid strict TS prop checks
const ShinyTextComp: any = ShinyText as any;

const features = [
  {
    title: " Medford's BLUVIA Neo",
    description:
      "BLUVIA NEO is an advanced medical washer disinfector designed for modern CSSDs. It streamlines workflows, shortens turnaround time, and ensures the highest safety and compliance standards—combining performance, precision, and reliability for confident infection control.",
    icon: BoltIcon,
    image: "/imgs/pr1-t.jpg",
  },
  {
    title: "High-Capacity Instrument Racks",
    description:
      "With racks handling up to 120 instruments per cycle, BLUVIA NEO enables fast, efficient reprocessing. This high capacity reduces downtime, speeds up surgical set availability, and strengthens infection control.",
    icon: GlobeAltIcon,
    image: "/imgs/pr2.jpg",
  },
  {
    title: "HEPA-Filtered Air Drying",
    description:
      "Equipped with 99.97% HEPA filtration, BLUVIA NEO delivers particle-free air for safe, moisture-free drying. This prevents recontamination, protects instruments from corrosion, and preserves sterility.",
    icon: RocketLaunchIcon,
    image: "/imgs/pr3.jpg",
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Monitor every cycle with real-time data tracking and documentation. Ensure compliance with quality standards while maintaining complete visibility into your sterilization processes.",
    icon: EyeIcon,
    image: "/imgs/pr1.jpg",
  },
];

// --- Hero Section ---
const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/', { state: { scrollToContact: true } });
  };

  return (
    <div className="relative h-screen flex items-center justify-start text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/prd-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="z-10 px-4 text-center w-full max-w-2xl ml-72">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          <ShinyTextComp
            text="BLUVIA Neo"
            className="inline-block text-white"
            speed={4}
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-xl md:text-xl max-w-2xl"
        >
          Engineered for safety, efficiency, and reliability.
        </motion.p>
        <button
          onClick={handleGetStarted}
          className="inline-block mt-8 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg text-lg transition-colors"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

// --- Features Section with Individual Images ---
const ScrollingFeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            BLUVIA Neo
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Redefining sterilization with smarter, safer technology.
          </motion.p>
        </div>

        {/* Features with individual images */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                    <Lens zoomFactor={1.8}>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </Lens>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-40"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [360, 180, 0],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="h-px bg-gradient-to-r from-purple-600 to-transparent flex-1"
                  />
                </div>

                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
                >
                  {feature.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {feature.description}
                </motion.p>

                {/* Feature highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Advanced Technology
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                    ISO Compliant
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Energy Efficient
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Product Page ---
const ProductsPage: React.FC = () => (
  <div>
    <HeroSection />
    <ScrollingFeaturesSection />
  </div>
);

export default ProductsPage;