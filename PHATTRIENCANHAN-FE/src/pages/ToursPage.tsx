import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
// Xóa dòng import API_BASE_URL nếu không dùng nữa
import { toursSampleData } from '../mocks/toursSampleData'; // Thêm dòng này

interface TourItem {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  duration: number;
  location: string;
}

const ToursPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toursPerPage = 6;
  const [totalTours, setTotalTours] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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

  // Sử dụng dữ liệu tĩnh thay cho fetch API
  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setTours(toursSampleData);
      setTotalTours(toursSampleData.length);
      setLoading(false);
    }, 400); // Giả lập loading
  }, []);

  // Tính tổng số trang khi totalTours hoặc toursPerPage thay đổi
  useEffect(() => {
    if (totalTours > 0 && toursPerPage > 0) {
      setTotalPages(Math.ceil(totalTours / toursPerPage));
    } else {
      setTotalPages(0);
    }
  }, [totalTours, toursPerPage]);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Áp dụng filter
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

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, durationFilter]);

  // Lấy danh sách tour cho trang hiện tại
  const startIndex = (currentPage - 1) * toursPerPage;
  const endIndex = startIndex + toursPerPage;
  const currentTours = filteredTours.slice(startIndex, endIndex);

  // Tạo mảng số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTours.length / toursPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div className="text-center py-12">Đang tải danh sách tour...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Lỗi: {error}</div>;
  }

  if (filteredTours.length === 0) {
    return <div className="text-center py-12 text-gray-600">Không tìm thấy tour nào phù hợp.</div>;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Khám phá tour du lịch</h1>
          <p className="text-lg text-gray-600">
            Tìm kiếm và đặt tour du lịch phù hợp với bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Bộ lọc</h2>
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${selectedCategory === category.id ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Khoảng giá</h3>
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
              {/* Duration */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Thời gian</h3>
                <div className="space-y-2">
                  {durations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDurationFilter(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${durationFilter === item.id ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Tours Grid */}
          <div className="lg:col-span-3">
            {currentTours.length === 0 && !loading && !error && (
              <div className="text-center py-12 text-gray-600">Không tìm thấy tour nào phù hợp trên trang này với bộ lọc hiện tại.</div>
            )}
            {currentTours.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTours.map(tour => (
                  <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                    <img
                      src={tour.images && tour.images.length > 0 ? tour.images[0] : "https://via.placeholder.com/400x250"}
                      alt={tour.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {tour.location}
                        </span>
                        <span className="text-sm text-gray-500">{tour.duration} ngày</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        <Link to={`/tours/${tour.id}`} className="hover:text-primary transition-colors duration-300">
                          {tour.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 text-base line-clamp-3">
                        {tour.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">
                          {tour.price.toLocaleString()}đ
                        </span>
                        <Link
                          to={`/tours/${tour.id}`}
                          className="btn btn-primary transition-colors duration-300"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Pagination */}
            {pageNumbers.length > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === 1 || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
                  >
                    Trước
                  </button>
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      disabled={loading}
                      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === number ? 'bg-primary text-white shadow-md hover:bg-primary/90' : 'hover:bg-gray-50'} ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length || loading}
                    className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === pageNumbers.length || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
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