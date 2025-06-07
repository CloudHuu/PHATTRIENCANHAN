import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { toursSampleData } from '../mocks/toursSampleData';

interface TourDetail {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  images: string[];
  location: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  isActive: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const found = toursSampleData.find(t => t.id === Number(id));
      if (found) {
        setTour({
          ...found,
          title: found.name,
          isActive: true,
          isNew: false,
          createdAt: '',
          updatedAt: '',
        });
        setError(null);
      } else {
        setTour(null);
        setError('Không tìm thấy tour.');
      }
      setLoading(false);
    }, 300);
  }, [id]);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center py-16">
        <ClipLoader color="#0d9488" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center py-16 text-red-600 text-lg">
        Lỗi: {error}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center py-16 text-gray-600 text-lg">
        Không tìm thấy tour.
      </div>
    );
  }

  const mainImage = tour.images && tour.images.length > 0 ? tour.images[0] : 'https://via.placeholder.com/1200x600';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors duration-300">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/tours" className="hover:text-blue-600 transition-colors duration-300">
            Tour du lịch
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-xs">{tour.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img
                src={mainImage}
                alt={tour.name}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Tour Info */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {tour.location}
                  </span>
                  <span className="text-sm text-gray-500">{tour.duration} ngày</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {tour.name}
                </h1>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Mô tả</h3>
                  <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                    <p>{tour.description}</p>
                  </div>
                </div>

                {/* Highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Điểm nổi bật</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Included */}
                {tour.included && tour.included.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Bao gồm</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {tour.included.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Excluded */}
                {tour.excluded && tour.excluded.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Không bao gồm</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {tour.excluded.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {tour.price.toLocaleString()}đ
              </div>
              <Link
                to={`/booking/${tour.id}`}
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Đặt tour ngay
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;