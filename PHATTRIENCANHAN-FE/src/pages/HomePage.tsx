import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
const HomePage: React.FC = () => {
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Tin tức nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                 <Link to="/news/1" className="block hover:text-primary transition-colors">
                <img src="/image/danang.jpg" alt="News"/>
                HÀNH TRÌNH KIẾN TẠO MIỀN TRUNG: ĐÀ NẴNG - SƠN TRÀ - HỘI AN - BÀ NÀ - CÙ LAO CHÀM
              </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Mô tả ngắn về tin tức 1...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>20/03/2024</span>
                  <span>100 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/news/2" className="hover:text-primary transition-colors duration-300">
                    Tiêu đề tin tức 2
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Mô tả ngắn về tin tức 2...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>19/03/2024</span>
                  <span>85 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/news/3" className="hover:text-primary transition-colors duration-300">
                    Tiêu đề tin tức 3
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Mô tả ngắn về tin tức 3...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>18/03/2024</span>
                  <span>120 lượt xem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Tour du lịch nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tour Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/1" className="hover:text-primary transition-colors duration-300">
                    Tour du lịch Đà Nẵng - Hội An
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Khám phá vẻ đẹp của Đà Nẵng và phố cổ Hội An...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">2,500,000đ</span>
                  <span className="text-sm text-gray-500">3 ngày 2 đêm</span>
                </div>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/2" className="hover:text-primary transition-colors duration-300">
                    Tour du lịch Nha Trang
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Tận hưởng không khí biển và các hoạt động thú vị...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">3,200,000đ</span>
                  <span className="text-sm text-gray-500">4 ngày 3 đêm</span>
                </div>
              </div>
            </div>

            {/* Tour Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/3" className="hover:text-primary transition-colors duration-300">
                    Tour du lịch Sapa
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  Khám phá vẻ đẹp núi rừng và văn hóa dân tộc...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">2,800,000đ</span>
                  <span className="text-sm text-gray-500">3 ngày 2 đêm</span>
                </div>
              </div>
            </div>
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