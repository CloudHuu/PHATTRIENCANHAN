import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ToursPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [duration, setDuration] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'domestic', name: 'Tour trong nước' },
    { id: 'international', name: 'Tour quốc tế' },
    { id: 'beach', name: 'Tour biển' },
    { id: 'mountain', name: 'Tour núi' },
  ];

  const durations = [
    { id: 'all', name: 'Tất cả' },
    { id: '1-3', name: '1-3 ngày' },
    { id: '4-7', name: '4-7 ngày' },
    { id: '8+', name: '8+ ngày' },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Khám phá tour du lịch</h1>
          <p className="text-lg text-gray-600">
            Tìm kiếm và đặt tour du lịch phù hợp với bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Bộ lọc</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${selectedCategory === category.id ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Khoảng giá</h3>
                <div className="px-3">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>0đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Thời gian</h3>
                <div className="space-y-2">
                  {durations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDuration(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-300 ${duration === item.id ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tour Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <img
                  src="https://via.placeholder.com/400x250"
                  alt="Tour"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Tour trong nước
                    </span>
                    <span className="text-sm text-gray-500">3 ngày 2 đêm</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to="/tours/1" className="hover:text-primary transition-colors duration-300">
                      Tour du lịch Đà Nẵng - Hội An
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-base">
                    Khám phá vẻ đẹp của Đà Nẵng và phố cổ Hội An...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      2,500,000đ
                    </span>
                    <Link
                      to="/tours/1"
                      className="btn btn-primary transition-colors duration-300"
                    >
                      Chi tiết
                    </Link>
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                      Tour quốc tế
                    </span>
                    <span className="text-sm text-gray-500">4 ngày 3 đêm</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to="/tours/2" className="hover:text-primary transition-colors duration-300">
                      Tour du lịch Thái Lan
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Khám phá văn hóa và ẩm thực Thái Lan...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      5,800,000đ
                    </span>
                    <Link
                      to="/tours/2"
                      className="btn btn-primary transition-colors duration-300"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tour Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <img
                  src="https://via.placeholder.com/400x250"
                  alt="Tour"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      Tour biển
                    </span>
                    <span className="text-sm text-gray-500">3 ngày 2 đêm</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link to="/tours/3" className="hover:text-primary transition-colors duration-300">
                      Tour du lịch Nha Trang
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tận hưởng không khí biển và các hoạt động thú vị...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      3,200,000đ
                    </span>
                    <Link
                      to="/tours/3"
                      className="btn btn-primary transition-colors duration-300"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300">
                  Trước
                </button>
                <button className="px-4 py-2 border rounded-md bg-primary text-white shadow-md transition-colors duration-300 hover:bg-primary/90">
                  1
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300">
                  2
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300">
                  3
                </button>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300">
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage; 