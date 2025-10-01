import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Layers, Video, Headphones, Shield, Clock, Award, Users } from "lucide-react"; // icons
import CardSwap, { Card } from '../components/CardSwap';
import { AnimatedTestimonials } from "../src/components/ui/animated-testimonials";

gsap.registerPlugin(ScrollTrigger);

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
        Our Service Wing
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
  <section id="about" className="min-h-screen bg-white flex items-center scroll-mt-24">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Image on the left */}
      <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
        <img
          src="imgs/logo2.jpg"
          alt="Car"
          className="max-w-lg w-full h-auto drop-shadow-lg rounded-xl"
        />
      </div>
      {/* Text content on the right */}
  <div className="md:w-1/2 w-full text-left flex flex-col justify-center">
        <h3 className="text-2xl font-light text-gray-500 mb-3">About Medford Design Lab</h3>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Powering MedTech  {" "}
          <span className="bg-purple-200 px-1 rounded">Innovation,</span>{" "}
          One Prototype at a Time
          <span className="text-purple-700">.</span>
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          M Design Lab is the dedicated innovation wing of Medford Technologies, created to bridge the gap between visionary ideas and market-ready medical technology solutions.
          Our approach combines deep industry expertise, precise engineering, and market-driven insights, empowering startups, research labs, hospitals, and founders to develop breakthrough medical technologies faster, safer, and more cost-effectively.
        </p>
        {/* Download Brochure Button below text */}
        <a
          href="/docs/DL_BROUCHER.pdf"
          download
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition-colors w-fit"
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
    designation: "r",
    src: "imgs/ch2.jpg"
  },
  {
    quote: "Many projects move forward without solid market research, resulting in products that miss real-world needs or fail commercially.",
    name: "Lack of Market Validation",
    designation: "",
    src: "imgs/ch3.jpg"
  },
];

// ---------------- SERVICES SECTION ----------------
const ServicesSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-12">
  <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side content */}
  <div className="md:pr-20 pr-12">
          <h3 className="text-2xl font-light text-gray-500 mb-3">Our Services</h3>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Concept-to-Prototype Development
          </h2>
          <p className="text-lg text-gray-700 max-w-full mb-6">
            We specialize in transforming innovative MedTech ideas into market-ready prototypes with
            <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded font-semibold mx-1">speed and precision</span>.
            From initial concept sketches to functional models, our expert team integrates clinical insights, engineering excellence, and regulatory guidance — ensuring every product is designed for safety, compliance, and manufacturability. Empower your innovation with our streamlined, research-backed development process.
          </p>
          
        </div>
        {/* Right side CardSwap for Key Highlights */}
  <div className="relative h-[250px] flex items-start justify-center ml-8 md:ml-20">
          <CardSwap
            width={400}
            height={300}
            cardDistance={30}
            verticalDistance={25}
            delay={3000}
            pauseOnHover={true}
            skewAmount={4}
            easing="elastic"
            onCardClick={() => {}}
          >
            <Card className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg border border-purple-700">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Layers className="w-10 h-10 text-purple-700" />
              </div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">Rapid Prototyping</h4>
              <p className="text-purple-700 text-base">Fast turnaround from idea to functional model</p>
            </Card>
            <Card className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg border border-purple-700">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Users className="w-10 h-10 text-purple-700" />
              </div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">Clinical Validation</h4>
              <p className="text-purple-700 text-base">Insights from medical experts for real-world relevance</p>
            </Card>
            <Card className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg border border-purple-700">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Shield className="w-10 h-10 text-purple-700" />
              </div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">Regulatory Support</h4>
              <p className="text-purple-700 text-base">Guidance for navigating complex compliance standards</p>
            </Card>
            <Card className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg border border-purple-700">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Award className="w-10 h-10 text-purple-700" />
              </div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">IP Protection</h4>
              <p className="text-purple-700 text-base">Strong strategies to safeguard your innovation</p>
            </Card>
            <Card className="bg-white p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-lg border border-purple-700">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Layers className="w-10 h-10 text-purple-700" />
              </div>
              <h4 className="text-xl font-bold text-purple-700 mb-2">Scalable Design</h4>
              <p className="text-purple-700 text-base">Built for manufacturability and future growth</p>
            </Card>
          </CardSwap>
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
          className="w-full h-[500px] mt-8 bg-purple-600 relative overflow-hidden"
          style={{
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
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
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
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
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
