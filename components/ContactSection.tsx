import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';

// Define the Section component inline for this file
const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-20 px-0 ${className}`}>
      {children}
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    designation: '',
    email: '',
    organization: '',
    enquire: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '🎉 Success! Your message has been sent successfully. We will get back to you within 24 hours. Thank you for contacting MedFord Technologies!'
        });
        // Reset form
        setFormData({
          fullName: '',
          designation: '',
          email: '',
          organization: '',
          enquire: '',
          message: ''
        });
        // Auto-hide success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 8000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'There was an error sending your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" className="bg-[#f7f7fb] text-gray-900 scroll-mt-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center py-16">
        {/* Left Info Panel */}
        <div className="pr-8">
          <p className="text-xs font-semibold text-purple-600 mb-2 tracking-widest">WE'RE HERE TO HELP YOU</p>
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
          <p className="text-sm text-gray-700 mb-4">support@medford.in</p>
          <div className="flex items-center gap-3 mb-2">
            <MdPhone className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium">Phone number</span>
          </div>
          <p className="text-sm text-gray-700 mb-4">+91 90807 05892</p>
        </div>
        
        {/* Right Form Panel */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl text-gray-800 w-full max-w-md mx-auto">
          {/* Status Message */}
          {submitStatus.type && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 animate-fadeIn ${
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

          <div className="mb-4">
            <label htmlFor="fullName" className="block font-semibold mb-1 text-gray-700">Name *</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Jane Smith" 
              required
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="designation" className="block font-semibold mb-1 text-gray-700">Designation</label>
            <input 
              type="text" 
              id="designation" 
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="e.g. Lab Manager" 
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@domain.com" 
              required
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="organization" className="block font-semibold mb-1 text-gray-700">Organization</label>
            <input 
              type="text" 
              id="organization" 
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              placeholder="e.g. Medford Hospital" 
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" 
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="enquire" className="block font-semibold mb-1 text-gray-700">Enquire</label>
            <select 
              id="enquire" 
              name="enquire"
              value={formData.enquire}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select enquiry type</option>
              <option value="product">Product</option>
              <option value="design-lab">Design Lab</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Message *</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4} 
              placeholder="Type your message" 
              required
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Get a Solution
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
};

export default ContactSection;
