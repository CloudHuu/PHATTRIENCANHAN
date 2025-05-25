import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Khám phá thế giới với News & Travel
            </h1>
            <p className="text-xl mb-8">
              Cập nhật tin tức mới nhất và đặt tour du lịch chất lượng cao
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/news" className="btn bg-white text-primary hover:bg-gray-100">
                Xem tin tức
              </Link>
              <Link to="/tours" className="btn bg-secondary text-white hover:bg-secondary/90">
                Khám phá tour
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Tin tức nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/news/1" className="hover:text-primary">
                    Tiêu đề tin tức 1
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Mô tả ngắn về tin tức 1...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>20/03/2024</span>
                  <span>100 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/news/2" className="hover:text-primary">
                    Tiêu đề tin tức 2
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Mô tả ngắn về tin tức 2...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>19/03/2024</span>
                  <span>85 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="News"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/news/3" className="hover:text-primary">
                    Tiêu đề tin tức 3
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
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
          <h2 className="text-3xl font-bold mb-8 text-center">Tour du lịch nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tour Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/1" className="hover:text-primary">
                    Tour du lịch Đà Nẵng - Hội An
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Khám phá vẻ đẹp của Đà Nẵng và phố cổ Hội An...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">2,500,000đ</span>
                  <span className="text-sm text-gray-500">3 ngày 2 đêm</span>
                </div>
              </div>
            </div>

            {/* Tour Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/2" className="hover:text-primary">
                    Tour du lịch Nha Trang
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Tận hưởng không khí biển và các hoạt động thú vị...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">3,200,000đ</span>
                  <span className="text-sm text-gray-500">4 ngày 3 đêm</span>
                </div>
              </div>
            </div>

            {/* Tour Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://via.placeholder.com/400x250"
                alt="Tour"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="/tours/3" className="hover:text-primary">
                    Tour du lịch Sapa
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
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
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng cho chuyến phiêu lưu tiếp theo?
          </h2>
          <p className="text-xl mb-8">
            Đăng ký ngay để nhận thông tin về các tour du lịch mới nhất
          </p>
          <Link to="/tours" className="btn bg-white text-secondary hover:bg-gray-100">
            Khám phá ngay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 