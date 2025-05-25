import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'food', name: 'Ẩm thực' },
    { id: 'events', name: 'Sự kiện' },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Tin tức mới nhất</h1>
          <p className="text-lg text-gray-600">
            Cập nhật những tin tức mới nhất về du lịch và văn hóa
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${selectedCategory === category.id ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* News Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            <img
              src="https://via.placeholder.com/400x250"
              alt="News"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Du lịch</span>
                <span className="text-sm text-gray-500">20/03/2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/news/1" className="hover:text-primary transition-colors duration-300">
                  Khám phá vẻ đẹp của Đà Nẵng
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 text-base">
                Đà Nẵng - thành phố biển xinh đẹp với những bãi biển tuyệt vời và
                văn hóa phong phú...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Tác giả: Admin</span>
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
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Văn hóa</span>
                <span className="text-sm text-gray-500">19/03/2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/news/2" className="hover:text-primary transition-colors duration-300">
                  Lễ hội đèn lồng Hội An
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 text-base">
                Khám phá vẻ đẹp của lễ hội đèn lồng truyền thống tại phố cổ Hội
                An...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Tác giả: Admin</span>
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
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">Ẩm thực</span>
                <span className="text-sm text-gray-500">18/03/2024</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <Link to="/news/3" className="hover:text-primary transition-colors duration-300">
                  Đặc sản ẩm thực miền Trung
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 text-base">
                Khám phá những món ăn đặc sắc của ẩm thực miền Trung Việt Nam...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Tác giả: Admin</span>
                <span>120 lượt xem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors duration-300">
              Trước
            </button>
            <button className="px-4 py-2 border rounded-md bg-primary text-white shadow-md transition-colors duration-300 hover:bg-primary/90">
              1
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors duration-300">
              2
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors duration-300">
              3
            </button>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors duration-300">
              Sau
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 