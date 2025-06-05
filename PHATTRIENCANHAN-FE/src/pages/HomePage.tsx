import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import { newsSampleData } from '../mocks/newsSampleData';
import { toursSampleData } from '../mocks/toursSampleData';

const HomePage: React.FC = () => {
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

  interface TourItem {
    id: number;
    name: string;
    description: string;
    images: string[];
    price: number;
    duration: string;
  }

  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState<string | null>(null);

  const [featuredTours, setFeaturedTours] = useState<TourItem[]>([]);
  const [loadingTours, setLoadingTours] = useState(true);
  const [errorTours, setErrorTours] = useState<string | null>(null);

  // Lấy dữ liệu mẫu cho tin tức nổi bật
  useEffect(() => {
    setLoadingNews(true);
    setErrorNews(null);
    setTimeout(() => {
      setFeaturedNews(newsSampleData.slice(0, 3));
      setLoadingNews(false);
    }, 300);
  }, []);

  // Lấy dữ liệu mẫu cho tour nổi bật
  useEffect(() => {
    setLoadingTours(true);
    setErrorTours(null);
    setTimeout(() => {
      setFeaturedTours(
        toursSampleData.slice(0, 3).map(tour => ({
          ...tour,
          duration: tour.duration.toString(),
        }))
      );
      setLoadingTours(false);
    }, 300);
  }, []);

  return (
    <div>
      <HeroSlider />

      {/* Featured News Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-700">
            Tin Tức Nổi Bật
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-200">
            {loadingNews && <div className="text-center py-4">Đang tải tin tức...</div>}
            {errorNews && <div className="text-center py-4 text-red-600">Lỗi: {errorNews}</div>}
            {!loadingNews && !errorNews && featuredNews.length === 0 && (
              <div className="text-center py-4 text-gray-600">Không tìm thấy tin tức nổi bật.</div>
            )}
            {!loadingNews && !errorNews && featuredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-md flex min-w-[300px] sm:min-w-[400px] snap-start transition-transform duration-300 ease-in-out hover:shadow-lg">
                <img
                  src={
                    news.images && news.images.length > 0
                      ? news.images[0]
                      : '/default-image.jpg'
                  }
                  alt={news.title}
                  className="w-1/3 object-cover rounded-l-lg"
                />
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link
                      to={`/news/${news.id}`}
                      className="block text-gray-800 hover:text-teal-600 transition-colors duration-300"
                    >
                      {news.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {news.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{news.date}</span>
                    <span>{news.views} lượt xem</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Tour du lịch nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingTours && <div className="text-center py-4">Đang tải tour...</div>}
            {errorTours && <div className="text-center py-4 text-red-600">Lỗi: {errorTours}</div>}
            {!loadingTours && !errorTours && featuredTours.length === 0 && (
              <div className="text-center py-4 text-gray-600">Không tìm thấy tour nổi bật.</div>
            )}
            {!loadingTours && !errorTours && featuredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <img
                  src={
                    tour.images && tour.images.length > 0
                      ? tour.images[0]
                      : '/default-image.jpg'
                  }
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to={`/tours/${tour.id}`} className="hover:text-primary transition-colors duration-300">
                      {tour.name}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-base">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">{tour.price?.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm text-gray-500">{tour.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng cho chuyến phiêu lưu tiếp theo?
          </h2>
          <p className="text-xl mb-8">
            Đăng ký ngay để nhận thông tin về các tour du lịch mới nhất
          </p>
          <Link to="/tours" className="btn bg-white text-secondary hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg">
            Khám phá ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;