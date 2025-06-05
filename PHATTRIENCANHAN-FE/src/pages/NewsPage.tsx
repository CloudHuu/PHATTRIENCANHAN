import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsSampleData } from '../mocks/newsSampleData';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  images: string[];
  description: string;
  author: string;
  views: number;
}

interface Category {
  id: string;
  name: string;
}

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = [
    { id: 'all', name: 'Tất cả' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'food', name: 'Ẩm thực' },
    { id: 'events', name: 'Sự kiện' },
  ];

  // Hàm trả về class màu cho từng category
  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'travel':
      case 'Du lịch':
        return 'bg-blue-100 text-blue-700';
      case 'culture':
      case 'Văn hóa':
        return 'bg-yellow-100 text-yellow-700';
      case 'food':
      case 'Ẩm thực':
        return 'bg-green-100 text-green-700';
      case 'events':
      case 'Sự kiện':
        return 'bg-pink-100 text-pink-700';
      case 'all':
      case 'Tất cả':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setAllNews(newsSampleData);
      setLoading(false);
    }, 400);
  }, []);

  const filteredNews = selectedCategory === 'all' ? allNews : allNews.filter(news => news.category === selectedCategory);

  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getNewsImage = (news: any) => {
    if (news.images && news.images.length > 0) return news.images[0];
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
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${selectedCategory === category.id
                ? `${getCategoryClass(category.id)} shadow-sm border-transparent`
                : 'bg-white text-gray-700 border-gray-300 hover:bg-teal-100'
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
                src={getNewsImage(news)}
                alt={news.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryClass(news.category)}`}>
                    {getCategoryName(news.category)}
                  </span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <Link to={`/news/${news.id}`} className="text-gray-800 hover:text-teal-600 transition-colors duration-200">
                    {news.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{news.description}</p>
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