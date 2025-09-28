"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { BoltIcon, GlobeAltIcon, RocketLaunchIcon, EyeIcon } from "../components/Icons";
import { Lens } from "../components/ui/lens";
import ShinyText from '../components/ShinyText'; // Add ShinyText import

// Cast to `any` to avoid strict TS prop checks
const ShinyTextComp: any = ShinyText as any;

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: " Medford’s BLUVIA Neo",
    description:
      "BLUVIA NEO is an advanced medical washer disinfector designed for modern CSSDs. It streamlines workflows, shortens turnaround time, and ensures the highest safety and compliance standards—combining performance, precision, and reliability for confident infection control.",
    icon: BoltIcon,
    image: "/imgs/pr1.jpg",
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
    title: "Advanced Disinfecting Solutions",
    description:
      "Using specialized disinfectants and precision cycles, BLUVIA NEO ensures spotless, ISO-compliant cleaning across all instrument types—delivering consistent, repeatable results for CSSDs worldwide.",
    icon: EyeIcon,
    image: "/imgs/pr3.jpg",
  },
  {
    title: "Integrated Digital Documentation",
    description:
      "BLUVIA NEO simplifies compliance with automated cycle recording via network or USB. Offering full traceability and audit-ready reporting, it ensures transparency and regulatory confidence.",
    icon: GlobeAltIcon,
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

// --- Features Section with GSAP on Desktop ---
const ScrollingFeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const featureCards = gsap.utils.toArray<Element>(".feature-card");
      const featureImages = gsap.utils.toArray<Element>(".feature-image");

      gsap.set(featureImages, { yPercent: 100 });
      gsap.set(featureImages[0], { yPercent: 0 });

      featureCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveIndex(index);
            if (index > 0) {
              gsap.to(featureImages[index - 1], {
                yPercent: -100,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
            }
            gsap.to(featureImages[index], {
              yPercent: 0,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: true,
            });
          },
          onEnterBack: () => {
            setActiveIndex(index);
            if (index < featureImages.length - 1) {
              gsap.to(featureImages[index + 1], {
                yPercent: 100,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              });
            }
            gsap.fromTo(
              featureImages[index],
              { yPercent: -100 },
              {
                yPercent: 0,
                duration: 0.6,
                ease: "power2.inOut",
                overwrite: true,
              }
            );
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">BLUVIA  Neo</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600">
            Redefining sterilization with smarter, safer technology.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left side: Sticky Image with Lens Effect */}
        <div className="hidden md:block sticky top-24 self-start h-[calc(100vh-8rem)]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-image absolute inset-0 w-full h-full ${activeIndex === index ? 'z-10' : 'z-0'}`}
              >
                {activeIndex === index ? (
                  <div className="w-full h-full">
                    <Lens zoomFactor={1.8}>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </Lens>
                  </div>
                ) : (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Right side: Scrolling Content */}
        <div className="flex flex-col gap-12 md:gap-0">
          {features.map((feature, index) => (
            <div key={index} className="feature-card min-h-0 md:min-h-[60vh] flex items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: activeIndex === index ? 1 : 0.95,
                  opacity: activeIndex === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-8 rounded-lg shadow-lg w-full"
              >
                <div className="md:hidden mb-6 rounded-md overflow-hidden">
                  <Lens zoomFactor={1.5}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover"
                    />
                  </Lens>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <feature.icon className="w-12 h-12 text-primary flex-shrink-0" />
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="mt-2 text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            </div>
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
