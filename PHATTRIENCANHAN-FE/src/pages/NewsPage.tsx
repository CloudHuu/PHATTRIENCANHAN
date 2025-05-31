import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'food', name: 'Ẩm thực' },
    { id: 'events', name: 'Sự kiện' },
  ];

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

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
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
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <img
                  src="/image/danang.jpg"
                  alt="Đà Nẵng"
                  className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                  Du lịch
                </span>
                  <span className="text-xs text-gray-500">20/03/2024</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <Link
                      to="/news/1"
                      className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                  >
                    Khám Phá Vẻ Đẹp Của Đà Nẵng
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  Đà Nẵng - thành phố biển với bãi biển Mỹ Khê tuyệt đẹp và cầu Rồng độc đáo.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Tác giả: Admin</span>
                  <span>100 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <img
                  src="/image/hoian.jpg"
                  alt="Hội An"
                  className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                  Văn hóa
                </span>
                  <span className="text-xs text-gray-500">19/03/2024</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <Link
                      to="/news/2"
                      className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                  >
                    Lễ Hội Đèn Lồng Hội An
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  Trải nghiệm vẻ đẹp lung linh của phố cổ Hội An trong lễ hội đèn lồng truyền thống.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Tác giả: Admin</span>
                  <span>85 lượt xem</span>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
              <img
                  src="/image/food.jpg"
                  alt="Ẩm thực"
                  className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                  Ẩm thực
                </span>
                  <span className="text-xs text-gray-500">18/03/2024</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <Link
                      to="/news/3"
                      className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                  >
                    Đặc Sản Ẩm Thực Miền Trung
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  Thưởng thức các món ăn độc đáo như mì Quảng, bánh tráng cuốn thịt heo.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Tác giả: Admin</span>
                  <span>120 lượt xem</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-100 transition-colors duration-200">
                Trước
              </button>
              <button className="px-3 py-1 border rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-100 transition-colors duration-200">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-100 transition-colors duration-200">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-100 transition-colors duration-200">
                Sau
              </button>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default NewsPage;