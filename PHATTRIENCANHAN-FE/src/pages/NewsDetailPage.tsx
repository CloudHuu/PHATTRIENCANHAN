import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { newsSampleData } from '../mocks/newsSampleData';

interface NewsDetailItem {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  views: number;
  images: string[];
  content: string;
  relatedNews?: { id: number; title: string; images: string[]; date: string }[];
}

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
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const found = newsSampleData.find(n => n.id === Number(id));
      if (found) {
        setNews({
          ...found,
          content: (found as any).content ?? '',
          relatedNews: (found as any).relatedNews ?? [],
        });
      } else {
        setNews(null);
        setError('Không tìm thấy tin tức.');
      }
      setLoading(false);
    }, 300);
  }, [id]);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const relatedNewsVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
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
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-center py-16 text-gray-600 text-lg">
        Không tìm thấy tin tức.
      </div>
    );
  }

  const mainImage = news.images && news.images.length > 0 ? news.images[0] : '/default-image.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-teal-600 transition-colors duration-300">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link to="/news" className="hover:text-teal-600 transition-colors duration-300">
            Tin tức
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate max-w-xs">{news.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.article
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={mainImage}
              alt={news.title}
              className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryClass(news.category)}`}>
                  {news.category}
                </span>
                <span className="text-sm text-gray-500">{news.date}</span>
                <span className="text-sm text-gray-500">Tác giả: {news.author}</span>
                <span className="text-sm text-gray-500">{news.views} lượt xem</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {news.title}
              </h1>
              <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
          </motion.article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {news.relatedNews && news.relatedNews.length > 0 && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold mb-6 text-gray-800">Tin tức liên quan</h2>
                <div className="space-y-6">
                  <AnimatePresence>
                    {news.relatedNews.map((item, index) => {
                      const relatedImage =
                        item.images && item.images.length > 0 ? item.images[0] : '/default-image.jpg';
                      return (
                        <motion.div
                          key={item.id}
                          custom={index}
                          variants={relatedNewsVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="block group transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
                        >
                          <Link to={`/news/${item.id}`} className="flex gap-4">
                            <img
                              src={relatedImage}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;