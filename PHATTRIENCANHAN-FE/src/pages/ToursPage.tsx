import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { toursSampleData } from '../mocks/toursSampleData';

interface TourItem {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  duration: number;
  location: string;
  views: number;
}

const ToursPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toursPerPage = 6;

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Tour trong nước', name: 'Tour trong nước' },
    { id: 'Tour biển', name: 'Tour biển' },
    { id: 'Tour núi', name: 'Tour núi' },
  ];

  const durations = [
    { id: 'all', name: 'Tất cả' },
    { id: '1-3', name: '1-3 ngày' },
    { id: '4-7', name: '4-7 ngày' },
    { id: '8+', name: '8+ ngày' },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const localTours = JSON.parse(localStorage.getItem('toursList') || '[]');
      setTours(localTours.length ? localTours : toursSampleData);
      setLoading(false);
    }, 400);
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      if (selectedCategory !== 'all' && tour.location !== selectedCategory) return false;
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false;
      if (durationFilter !== 'all') {
        if (durationFilter.endsWith('+')) {
          const minDuration = parseInt(durationFilter.replace('+', ''));
          if (tour.duration < minDuration) return false;
        } else {
          const [min, max] = durationFilter.split('-').map(Number);
          if (tour.duration < min || tour.duration > max) return false;
        }
      }
      return true;
    });
  }, [tours, selectedCategory, priceRange, durationFilter]);

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const startIndex = (currentPage - 1) * toursPerPage;
  const endIndex = startIndex + toursPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, durationFilter]);

  // Cải tiến phân trang với dấu ba chấm
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push('...');
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages - 1) pages.push('...');
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleTourClick = (id: number) => {
    let toursList = JSON.parse(localStorage.getItem('toursList') || '[]');
    if (!toursList.length) toursList = toursSampleData;
    const idx = toursList.findIndex((t: TourItem) => t.id === id);
    if (idx !== -1) {
      toursList[idx].views = (toursList[idx].views || 0) + 1;
      localStorage.setItem('toursList', JSON.stringify(toursList));
      setTours([...toursList]);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            Khám Phá Tour Du Lịch
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tìm kiếm và đặt tour du lịch phù hợp với bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Bộ Lọc Tìm Kiếm</h2>
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-gray-700">Danh Mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white shadow-md scale-105'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      aria-pressed={selectedCategory === category.id}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-gray-700">Khoảng Giá</h3>
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-colors duration-300"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-gray-700">Thời Gian</h3>
                <div className="space-y-2">
                  {durations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDurationFilter(item.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
                        durationFilter === item.id
                          ? 'bg-blue-500 text-white shadow-md scale-105'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                      aria-pressed={durationFilter === item.id}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tours Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-16">
                <ClipLoader color="#0d9488" size={50} />
                <p className="mt-4 text-gray-600">Đang tải danh sách tour...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-600 bg-red-50 rounded-xl p-6">
                Lỗi: {error}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Thử lại
                </button>
              </div>
            ) : currentTours.length === 0 ? (
              <div className="text-center py-12 text-gray-600 bg-white rounded-xl p-6">
                Không tìm thấy tour nào phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {currentTours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="relative">
                        <img
                          src={tour.images && tour.images.length > 0 ? tour.images[0] : 'https://via.placeholder.com/400x250'}
                          alt={tour.name}
                          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {tour.views || 0} lượt xem
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                            {tour.location}
                          </span>
                          <span className="text-sm text-gray-500">{tour.duration} ngày</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                          <Link
                            to={`/tours/${tour.id}`}
                            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                            onClick={() => handleTourClick(tour.id)}
                          >
                            {tour.name}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tour.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            {tour.price.toLocaleString()}đ
                          </span>
                          <Link
                            to={`/tours/${tour.id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            onClick={() => handleTourClick(tour.id)}
                          >
                            Chi tiết
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                      currentPage === 1 || loading
                        ? 'cursor-not-allowed opacity-50 bg-gray-100'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    aria-label="Trang trước"
                  >
                    Trước
                  </button>
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={loading || page === '...'}
                      className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                        page === currentPage
                          ? 'bg-blue-600 text-white shadow-md'
                          : page === '...' ? 'bg-white text-gray-400 cursor-default' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                      aria-label={typeof page === 'number' ? `Trang ${page}` : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                      currentPage === totalPages || loading
                        ? 'cursor-not-allowed opacity-50 bg-gray-100'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    aria-label="Trang sau"
                  >
                    Sau
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;