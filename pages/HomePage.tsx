import { Timeline } from "../ui/timeline";
import * as React from 'react';
import { motion, Variants, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

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
  '/imgs/investor2.png',
  '/imgs/investor3.png',
  '/imgs/investor1.png',
  '/imgs/investor2.png',
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



const SOCIAL_POSTS = [
  {
    platform: 'twitter',
    avatar: '/imgs/FB.webp',
    username: 'MedFord Technologies',
    handle: '@MedFord',
    caption: 'We\'re happy to share that Medford Technologies has been featured in Siliconlndia Startup City magazine: "Medford Technologies: Innovating Sterilization Systems for a Safer, Healthier Future." This feature highlights our journey in redefining sterilization and infection-control solutions, and our mission to build safer healthcare environments through innovation and precision engineering. Read the full story here: https://startup.siliconindia.com/.../medford-technologies... A big thank you to everyone who has been part of our journey.',
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
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
            <a
              href="https://www.linkedin.com/company/medford/"
              className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-colors shadow-lg"
            >
              Follow Us
            </a>
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
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12v1m0 0v1m0-1h-4m4 0h4m-4 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-sm font-medium">E-mail</span>
        </div>
        <p className="text-sm text-gray-700 mb-4">
support@medford.in
</p>
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm10-10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2z" /></svg>
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
      <section id="timeline" className="bg-black py-0 px-0 w-full">
        <Timeline data={timelineData} />
      </section>
      <SocialMediaSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;