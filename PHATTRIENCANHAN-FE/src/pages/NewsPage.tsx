import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { newsSampleData } from '../mocks/newsSampleData';

interface NewsItem {
  id: string;
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

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'travel':
      case 'Du lịch':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'culture':
      case 'Văn hóa':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'food':
      case 'Ẩm thực':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'events':
      case 'Sự kiện':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'all':
      case 'Tất cả':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const localNews = JSON.parse(localStorage.getItem('newsList') || '[]');
      setAllNews(localNews.length ? localNews : newsSampleData);
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

  // Improved pagination with ellipsis
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
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

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getNewsImage = (news: NewsItem) => {
    return news.images && news.images.length > 0 ? news.images[0] : '/default-image.jpg';
  };

  const handleNewsClick = (id: string) => {
    let newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    if (!newsList.length) newsList = newsSampleData;
    const idx = newsList.findIndex((n: NewsItem) => n.id === id);
    if (idx !== -1) {
      newsList[idx].views += 1;
      localStorage.setItem('newsList', JSON.stringify(newsList));
      setAllNews([...newsList]);
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-4">
            Tin Tức Du Lịch
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Khám phá những tin tức mới nhất về du lịch, văn hóa, ẩm thực và sự kiện tại Việt Nam
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${selectedCategory === category.id
                ? `${getCategoryClass(category.id)} shadow-md border-transparent scale-105`
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full flex justify-center py-16">
              <ClipLoader color="#0d9488" size={50} />
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-16 text-red-600 text-lg">
              Lỗi khi tải tin tức: {error}
            </div>
          )}
          {!loading && !error && currentNews.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-600 text-lg">
              Không tìm thấy tin tức nào phù hợp với bộ lọc.
            </div>
          )}
          <AnimatePresence>
            {!loading && !error && currentNews.map((news) => (
              <motion.div
                key={news.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={getNewsImage(news)}
                  alt={news.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryClass(news.category)}`}>
                      {getCategoryName(news.category)}
                    </span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    <Link
                      to={`/news/${news.id}`}
                      className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                      onClick={() => handleNewsClick(news.id)}
                    >
                      {news.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.description}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-4">Tác giả: {news.author}</span>
                    <span>{news.views} lượt xem</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className={`px-4 py-2 border rounded-md transition-all duration-200 ${currentPage === 1 || loading
                  ? 'cursor-not-allowed opacity-50 bg-gray-100'
                  : 'bg-white text-gray-700 hover:bg-teal-100 hover:shadow-sm'
                  }`}
              >
                Trước
              </button>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={loading || page === '...'}
                  className={`px-4 py-2 border rounded-md transition-all duration-200 ${page === currentPage
                    ? 'bg-teal-600 text-white shadow-md'
                    : page === '...' ? 'bg-white text-gray-400 cursor-default' : 'bg-white text-gray-700 hover:bg-teal-100 hover:shadow-sm'
                    } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className={`px-4 py-2 border rounded-md transition-all duration-200 ${currentPage === totalPages || loading
                  ? 'cursor-not-allowed opacity-50 bg-gray-100'
                  : 'bg-white text-gray-700 hover:bg-teal-100 hover:shadow-sm'
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