import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn';
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Giả lập gửi form
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000); // Ẩn thông báo sau 3s
    }, 1000);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Hãy liên hệ với BenThanhTourist để được hỗ trợ về các tour du lịch và thông tin chi tiết.
          </p>
        </div>
      </motion.section>

      {/* Contact Form and Info */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 mb-6">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Tin Nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-teal-600 text-white rounded-lg transition-all duration-300 shadow-md ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-teal-700 hover:shadow-lg hover:-translate-y-1'
                  }`}
                  aria-label="Gửi tin nhắn"
                >
                  {isSubmitting ? <ClipLoader color="#fff" size={20} /> : 'Gửi'}
                </button>
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 text-center text-green-600 bg-green-50 p-3 rounded-lg"
                    >
                      Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ sớm.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Contact Info */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="lg:w-1/3"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 mb-6">Thông Tin Liên Hệ</h2>
              <ul className="space-y-6 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-3 mt-1 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 00-8 8c0 3.86 2.77 7.07 6.5 7.78v2.72a1 1 0 001.55.83l3-2a1 1 0 00.45-.83v-2.28A7.95 7.95 0 0018 10a8 8 0 00-8-8zm-1 12v-2H7v2h2zm2-2v2h2v-2h-2zm-2-4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
                  </svg>
                  <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-3 mt-1 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="tel:+84123456789" className="hover:text-teal-600 transition-colors duration-300">
                    (84) 123-456-789
                  </a>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-3 mt-1 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:info@newstravel.com" className="hover:text-teal-600 transition-colors duration-300">
                    info@newstravel.com
                  </a>
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-teal-700 mb-4">Tìm Chúng Tôi</h3>
                <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    title="Vị trí BenThanhTourist trên Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502427839014!2d106.70042307587637!3d10.773374259222073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3eafc7b0b3%3A0x6e7b8b2e4e6c7e7b!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gQmVuIFRoYW5oIFRvdXJpc3Q!5e0!3m2!1svi!2s!4v1717740000000!5m2!1svi!2s"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;