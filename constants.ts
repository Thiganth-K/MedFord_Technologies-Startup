
import type { Service, Product, BlogPost } from './types';
import { BeakerIcon, WrenchScrewdriverIcon, ShieldCheckIcon, AcademicCapIcon } from './components/Icons';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'Career', path: '#career' },

  { name: 'Blog', path: '/#blog' },
  { name: 'FAQ', path: '/#faq' },
  { name: 'Contact', path: '/#contact' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: 'Sterilization Service',
    description: 'Advanced protocols for complete infection control.',
    longDescription: "Our state-of-the-art sterilization services utilize cutting-edge technology to ensure the highest level of decontamination for medical instruments and facilities. We adhere to the strictest industry standards, providing peace of mind and guaranteeing patient safety. Our processes are validated, documented, and tailored to meet the specific needs of your healthcare environment.",
    icon: ShieldCheckIcon,
    image: 'https://picsum.photos/seed/service1/800/600',
  },
  {
    id: 2,
    title: 'Equipment Maintenance',
    description: 'Expert device servicing, calibration, and repair.',
    longDescription: "Medford Technologies offers comprehensive maintenance and calibration services for a wide range of medical equipment. Our certified technicians ensure your devices operate at peak performance, minimizing downtime and extending their lifespan. Regular maintenance is key to reliable diagnostics and treatment, and our team is dedicated to precision and excellence.",
    icon: WrenchScrewdriverIcon,
    image: 'https://picsum.photos/seed/service2/800/600',
  },
  {
    id: 3,
    title: 'Infection Control Consulting',
    description: 'Customized plans and training for your facility.',
    longDescription: "Our expert consultants work with you to develop and implement robust infection control programs. We conduct thorough assessments, identify potential risks, and create tailored strategies that align with regulatory requirements and best practices. From workflow optimization to staff education, we provide the tools for a safer healthcare setting.",
    icon: BeakerIcon,
    image: 'https://picsum.photos/seed/service3/800/600',
  },
  {
    id: 4,
    title: 'Support & Training',
    description: 'Ongoing support and performance improvement.',
    longDescription: "We believe in partnership. Our commitment extends beyond services and products to include comprehensive training and continuous support for your team. We offer customized educational programs to ensure your staff is proficient with the latest technologies and protocols, empowering them to deliver the best possible care.",
    icon: AcademicCapIcon,
    image: 'https://picsum.photos/seed/service4/800/600',
  },
];

export const PRODUCTS_DATA: Product[] = [
    { id: 1, name: 'BLUVIA Neo', description: 'Advanced Washer Disinfector', image: 'https://picsum.photos/seed/prod1/600/400' },
    { id: 2, name: 'EnviroCleanse', description: 'Eco-friendly, broad-spectrum surface disinfectant.', image: 'https://picsum.photos/seed/prod2/600/400' },
    { id: 3, name: 'NanoGuard', description: 'Antimicrobial coating for high-touch surfaces.', image: 'https://picsum.photos/seed/prod3/600/400' },
    { id: 4, name: 'Calibright', description: 'Portable device for instant equipment calibration.', image: 'https://picsum.photos/seed/prod4/600/400' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Sterilization Technology',
    date: 'October 26, 2023',
    excerpt: 'Discover how advancements in plasma and vapor-phase sterilization are setting new standards for medical device reprocessing.',
    image: 'https://picsum.photos/seed/blog1/600/400',
    slug: 'future-of-sterilization-technology',
  },
  {
    id: 2,
    title: 'Choosing the Right Disinfectant for Your Facility',
    date: 'November 15, 2023',
    excerpt: 'A comprehensive guide to understanding antimicrobial spectrums, contact times, and safety profiles for surface disinfectants.',
    image: 'https://picsum.photos/seed/blog2/600/400',
    slug: 'choosing-right-disinfectant',
  },
  {
    id: 3,
    title: 'The Importance of Regular Equipment Maintenance',
    date: 'December 5, 2023',
    excerpt: 'Learn why preventative maintenance is crucial for extending the lifespan of medical devices and ensuring patient safety.',
    image: 'https://picsum.photos/seed/blog3/600/400',
    slug: 'importance-of-equipment-maintenance',
  },
];
