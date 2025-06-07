import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Thêm Framer Motion

const slides = [
  {
    image: '/image/bannerne.jpg',
    title: 'Khám Phá Thế Giới Cùng BenThanhTourist',
    subtitle: 'Cập nhật tin tức mới nhất và đặt tour du lịch chất lượng cao',
  },
  {
    image: '/image/bannerne2.jpg',
    title: 'Tour Hấp Dẫn Mỗi Mùa',
    subtitle: 'Đặt ngay để nhận ưu đãi đặc biệt',
  },
  {
    image: '/image/bannerne3.jpg',
    title: 'Chuyến Đi Trong Mơ',
    subtitle: 'Trải nghiệm hành trình tuyệt vời',
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000); // Tăng thời gian chuyển slide lên 7 giây
    return () => clearInterval(interval);
  }, []);

  const { image, title, subtitle } = slides[currentIndex];

  // Animation variants
  const slideVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 1, ease: 'easeInOut' } },
  };

  // Parallax effect
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const parallaxElement = document.querySelector('.hero-slider') as HTMLElement;
    if (parallaxElement) {
      parallaxElement.style.backgroundPositionY = `${scrollY * 0.3}px`; // Hiệu ứng parallax nhẹ
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden hero-slider transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-6 text-gray-100 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
          <div className="flex justify-center gap-4">
            <Link
              to="/news"
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
            >
              Xem Tin Tức
            </Link>
            <Link
              to="/tours"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
            >
              Khám Phá Tour
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default HeroSlider;