import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

// Assuming NewsItem structure matches the selected fields from backend News entity for the list view
interface NewsItem {
  id: number; // Backend returns number, frontend might use string from URL
  title: string;
  category: string;
  date: string; // Backend returns Date, might need formatting in frontend or return string from BE
  image: string;
  description: string;
  author: string;
  views: number;
}

interface Category {
  id: string; // Corresponds to category string from backend
  name: string;
}

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of news items per page

  const [allNews, setAllNews] = useState<NewsItem[]>([]); // State to hold all fetched news data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors


  const categories: Category[] = [
    { id: 'all', name: 'Tất cả' },
    // Ensure these IDs match the category values returned by backend
    { id: 'travel', name: 'Du lịch' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'food', name: 'Ẩm thực' },
    { id: 'events', name: 'Sự kiện' },
  ];

  // Effect to fetch news when the component mounts or selectedCategory changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the backend API to fetch news
        // Backend findAll currently does not support filtering, so fetch all and filter on frontend.
        // If backend adds filter support, update this API call.
        const response = await fetch(`${API_BASE_URL}/news`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: NewsItem[] = await response.json();
        console.log('Fetched news data:', data);

        // Store all fetched news, filtering will be applied later for display
        setAllNews(data);
        setLoading(false);

      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError('Không thể tải danh sách tin tức. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array: fetch all news once on mount

  // Apply category filter to all fetched news whenever allNews or selectedCategory changes
  const filteredNews = selectedCategory === 'all' ? allNews : allNews.filter(news => news.category === selectedCategory);

  // Pagination logic applied to filtered news
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset page to 1 when category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Get category name for displaying
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if name not found
  };

  // Thêm hàm lấy ảnh đại diện
  const getNewsImage = (news: any) => {
    if (news.images && news.images.length > 0) return news.images[0];
    if (news.mainImage) return news.mainImage;
    if (news.image) return news.image;
    return '/default-image.jpg';
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-teal-700">
            Tin Tức Du Lịch
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Khám phá những tin tức mới nhất về du lịch, văn hóa và ẩm thực Việt Nam
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                // setCurrentPage(1); // Already handled by effect above
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${selectedCategory === category.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-teal-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <div className="text-center py-12">Đang tải tin tức...</div>}
          {error && <div className="text-center py-12 text-red-600">Lỗi khi tải tin tức: {error}</div>}
          {!loading && !error && currentNews.length === 0 && (
            <div className="text-center py-12 text-gray-600">Không tìm thấy tin tức nào phù hợp với bộ lọc.</div>
          )}
          {!loading && !error && currentNews.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <img
                src={
                  getNewsImage(news).startsWith('http')
                    ? getNewsImage(news)
                    : `${API_BASE_URL}${getNewsImage(news)}`
                }
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {/* Display category name based on ID */}
                  <span className={`px-2 py-1 ${news.category === 'travel' ? 'bg-orange-100 text-orange-800' :
                    news.category === 'culture' ? 'bg-yellow-100 text-yellow-700' :
                      news.category === 'food' ? 'bg-red-100 text-red-700' :
                        news.category === 'events' ? 'bg-purple-100 text-purple-700' : ''
                    } rounded-full text-xs`}>
                    {getCategoryName(news.category)}
                  </span>
                  {/* Display formatted date - assuming backend returns string or Date object */}
                  <span className="text-xs text-gray-500">{news.date}</span> {/* You might need date formatting here */}
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {/* Link to news detail page */}
                  <Link
                    to={`/news/${news.id}`}
                    className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                  >
                    {news.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {news.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-4">Tác giả: {news.author}</span>
                  <span>{news.views} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className={`px-4 py-2 border rounded-md transition-colors duration-200 ${currentPage === 1 || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
                  }`}
              >
                Trước
              </button>

              {/* Page numbers */}
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  disabled={loading}
                  className={`px-4 py-2 border rounded-md transition-colors duration-200 ${currentPage === number ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100'
                    } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {number}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className={`px-4 py-2 border rounded-md transition-colors duration-200 ${currentPage === totalPages || loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
                  }`}
              >
                Sau
              </button>
            </nav>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewsPage;