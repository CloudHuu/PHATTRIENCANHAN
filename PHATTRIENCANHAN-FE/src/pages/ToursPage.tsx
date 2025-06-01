import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface TourItem {
  id: number;
  name: string;
  description: string;
  images: string[]; // Updated: Assuming backend returns an array of image paths
  price: number;
  duration: number; // Changed to number based on filtering logic
  location: string; // Based on category filtering
  // Add other relevant fields from your backend Tour entity
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
  const toursPerPage = 6; // Match backend default limit - Changed from useState
  const [totalTours, setTotalTours] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const API_BASE_URL = 'http://localhost:3000';

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

  // Effect to fetch tours when currentPage or toursPerPage changes
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the backend API with pagination parameters
        // NOTE: Filtering logic is applied on the frontend data after fetching.
        // For proper filtering across all pages, backend API needs to support filter parameters.
        const response = await fetch(`${API_BASE_URL}/tours?page=${currentPage}&limit=${toursPerPage}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the backend returns { data: Tour[], total: number }
        setTours(data.data); // Update tours state with the data for the current page
        setTotalTours(data.total); // Set the total number of tours
        setLoading(false);

      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Không thể tải danh sách tour. Vui lòng thử lại sau.'); // Set error message
        setLoading(false);
      }
    };

    fetchTours(); // Execute the fetch function

  }, [currentPage, toursPerPage]); // Rerun effect when currentPage or toursPerPage changes

  // Effect to calculate total pages when totalTours or toursPerPage changes
  useEffect(() => {
    if (totalTours > 0 && toursPerPage > 0) {
      setTotalPages(Math.ceil(totalTours / toursPerPage));
    } else {
      setTotalPages(0);
    }
  }, [totalTours, toursPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Apply frontend filtering to the tours data for the current page
  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      // Category Filter (using tour.location as a placeholder for category)
      if (selectedCategory !== 'all' && tour.location !== selectedCategory) {
        return false; // Exclude if category doesn't match
      }

      // Price Range Filter
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) {
        return false; // Exclude if price is outside range
      }

      // Duration Filter
      if (durationFilter !== 'all') {
        const [min, max] = durationFilter.split('-').map(Number); // Parse range (e.g., '1-3' -> [1, 3])
        if (durationFilter.endsWith('+')) { // Handle '8+' case
            const minDuration = parseInt(durationFilter.replace('+', ''));
             if (tour.duration < minDuration) {
                return false; // Exclude if duration is less than min
             }
        } else if (tour.duration < min || tour.duration > max) {
          return false; // Exclude if duration is outside range
        }
      }

      return true; // Include if all filters match
    });
  }, [tours, selectedCategory, priceRange, durationFilter]); // Re-filter whenever tours or filter states change

  // Handle filter changes (reset page to 1 when filters change)
  useEffect(() => {
      // Reset to first page when category, price range, or duration filter changes
      setCurrentPage(1);
  }, [selectedCategory, priceRange, durationFilter]);

  // Generate page numbers for pagination controls (based on totalTours from API, not filtered count)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
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
            {/* Display message if no tours match filters on the current page */}
            {filteredTours.length === 0 && !loading && !error && (
                <div className="text-center py-12 text-gray-600">Không tìm thấy tour nào phù hợp trên trang này với bộ lọc hiện tại.</div>
            )}
             {/* Only render the grid if there are tours to display after filtering */}
            {filteredTours.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Map over the filtered tours (which are from the current page) */} 
                  {filteredTours.map(tour => (
                    <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                      <img
                        // Access the first image in the images array
                        src={tour.images && tour.images.length > 0 ? `${API_BASE_URL}${tour.images[0]}` : "https://via.placeholder.com/400x250"} // Display first image or placeholder
                        alt={tour.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {/* Display Location as Category */}
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tour.location}
                          </span>
                          {/* Display Duration */}
                          <span className="text-sm text-gray-500">{tour.duration} ngày</span> {/* Use tour.duration (number) */}
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
             {/* Only show pagination if there are total tours > tours per page and no active frontend filters */}
             {totalPages > 1 && selectedCategory === 'all' && priceRange[0] === 0 && priceRange[1] === 10000000 && durationFilter === 'all' && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-2">
                    {/* Previous button */}
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading} // Disable if on first page or loading
                      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === 1 || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
                    >
                      Trước
                    </button>

                    {/* Page numbers */}
                    {pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        disabled={loading} // Disable if loading
                        className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === number ? 'bg-primary text-white shadow-md hover:bg-primary/90' : 'hover:bg-gray-50'} ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                      >
                        {number}
                      </button>
                    ))}

                    {/* Next button */}
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || loading} // Disable if on last page or loading
                      className={`px-4 py-2 border rounded-md transition-colors duration-300 ${currentPage === totalPages || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}
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