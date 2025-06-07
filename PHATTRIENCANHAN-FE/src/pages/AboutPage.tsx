import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AboutPage: React.FC = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Về BenThanhTourist</h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Khám phá thế giới cùng chúng tôi - mang đến những hành trình du lịch đáng nhớ và trải nghiệm văn hóa độc đáo.
          </p>
        </div>
      </motion.section>

      {/* Company Overview */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="/image/vntravel.jpg"
                alt="Vietnam Travel"
                className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 mb-4">Chúng Tôi Là Ai</h2>
              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                BenThanhTourist là công ty du lịch hàng đầu tại Việt Nam, chuyên cung cấp các tour du lịch chất lượng cao, trải nghiệm văn hóa độc đáo và tin tức du lịch cập nhật. Với hơn 10 năm kinh nghiệm, chúng tôi đã mang đến niềm vui cho hàng ngàn du khách.
              </p>
              <Link
                to="/tours"
                className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                aria-label="Khám phá các tour du lịch"
              >
                Khám Phá Tour
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            Chúng tôi cam kết mang đến những hành trình an toàn, thú vị và bền vững, giúp du khách khám phá vẻ đẹp của Việt Nam và thế giới, đồng thời tôn vinh giá trị văn hóa và bảo vệ môi trường.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-700 mb-8 text-center">Đội Ngũ Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Phan Ngọc Hữu', role: 'Giám đốc Điều hành', image: '/image/2.jpg' },
              { name: 'Trương Quang Minh', role: 'Quản lý Tour', image: '/image/3.jpg' },
              { name: 'Lê Minh Châu', role: 'Chuyên viên Marketing', image: '/image/4.jpg' },
            ].map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-end">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;