import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import API_BASE_URL from '../config/api'; // Thêm dòng này

const HomePage: React.FC = () => {

  interface NewsItem {
    id: number; // Backend returns number
    title: string;
    category: string;
    date: string; // Backend returns Date, might need formatting
    images: string[]; // Updated: Assuming backend returns an array of image paths
    description: string;
    author: string;
    views: number;
  }

  interface TourItem {
    id: number;
    name: string;
    description: string;
    images: string[]; // Updated: Assuming backend returns an array of image paths
    price: number;
    duration: string; // Or appropriate type
    // Add other relevant fields from your backend Tour entity
  }

  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState<string | null>(null);

  const [featuredTours, setFeaturedTours] = useState<TourItem[]>([]); // Use updated interface
  const [loadingTours, setLoadingTours] = useState(true);
  const [errorTours, setErrorTours] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      setLoadingNews(true);
      setErrorNews(null);
      try {
        // Fetch news from backend.
        const response = await fetch(`${API_BASE_URL}/news`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: NewsItem[] = await response.json();
        console.log('Fetched featured news data:', data);

        // Take the first 3 news items for the featured section
        setFeaturedNews(data.slice(0, 3));
        setLoadingNews(false);

      } catch (err: any) {
        console.error('Error fetching featured news:', err);
        setErrorNews('Không thể tải tin tức nổi bật.');
        setLoadingNews(false);
      }
    };

    fetchFeaturedNews();
  }, []); // Empty dependency array: fetch news once on mount

  // Effect to fetch featured tours when the component mounts
  useEffect(() => {
    const fetchFeaturedTours = async () => {
      setLoadingTours(true);
      setErrorTours(null);
      try {
        // Fetch tours from backend.
        // Assuming backend /tours endpoint returns { data: [], total: 0 }
        // Take the first 3 tours from data
        const response = await fetch(`${API_BASE_URL}/tours`);

         if (!response.ok) {
           const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Assuming { data: [], total: 0 }
        console.log('Fetched featured tours data:', result.data);

        // Take the first 3 tours from the data array
        setFeaturedTours(result.data.slice(0, 3));
        setLoadingTours(false);

      } catch (err: any) {
        console.error('Error fetching featured tours:', err);
        setErrorTours('Không thể tải tour nổi bật.');
        setLoadingTours(false);
      }
    };

    fetchFeaturedTours();
  }, []); // Empty dependency array: fetch tours once on mount

   return (
    <div>
      {/* Thay phần Hero Section cũ bằng slider 3 ảnh */}
      <HeroSlider/>
{/* <section
  className="relative bg-cover bg-center bg-no-repeat text-white py-32"
  // style={{ backgroundImage: `url('/image/danang1.jpg')` }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative z-10 container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
      Khám phá thế giới cùng với{' '}
      <span className="text-secondary">benthanhtourist</span>
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-gray-100">
      Cập nhật tin tức mới nhất và đặt tour du lịch chất lượng cao
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/news"
        className="btn bg-white text-black hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Xem tin tức
      </Link>
      <Link
        to="/tours"
        className="btn bg-secondary text-black hover:bg-secondary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Khám phá tour
      </Link>
    </div>
  </div>
</section> */}

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
                          ? (news.images[0].startsWith('http')
                              ? news.images[0]
                              : `${API_BASE_URL}${news.images[0]}`)
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
                      <span>{news.date}</span> {/* Apply date formatting if needed */}
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
                        ? (tour.images[0].startsWith('http')
                            ? tour.images[0]
                            : `${API_BASE_URL}${tour.images[0]}`)
                        : '/default-image.jpg'
                    }
                    alt={tour.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link to={`/tours/${tour.id}`} className="hover:text-primary transition-colors duration-300">
                        {tour.name} {/* Assuming tour object has a 'name' field */}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 text-base">
                      {tour.description} {/* Assuming tour object has a 'description' field */}
                    </p>
                    <div className="flex justify-between items-center">
                      {/* Assuming tour object has 'price' and 'duration' fields */}
                      <span className="text-xl font-bold text-primary">{tour.price?.toLocaleString('vi-VN')}đ</span> {/* Format price */}
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