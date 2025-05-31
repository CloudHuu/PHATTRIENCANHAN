import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of news items per page

  // Sample news data
  const allNews = [
    {
      id: '1',
      category: 'travel',
      date: '20/03/2024',
      image: '/image/danang.jpg',
      title: 'Khám Phá Vẻ Đẹp Của Đà Nẵng',
      description: 'Đà Nẵng - thành phố biển với bãi biển Mỹ Khê tuyệt đẹp và cầu Rồng độc đáo.',
      author: 'Admin',
      views: 100,
    },
    {
      id: '2',
      category: 'culture',
      date: '19/03/2024',
      image: '/image/hoian.jpg',
      title: 'Lễ Hội Đèn Lồng Hội An',
      description: 'Trải nghiệm vẻ đẹp lung linh của phố cổ Hội An trong lễ hội đèn lồng truyền thống.',
      author: 'Admin',
      views: 85,
    },
    {
      id: '3',
      category: 'food',
      date: '18/03/2024',
      image: '/image/food.jpg',
      title: 'Đặc Sản Ẩm Thực Miền Trung',
      description: 'Thưởng thức các món ăn độc đáo như mì Quảng, bánh tráng cuốn thịt heo.',
      author: 'Admin',
      views: 120,
    },
    {
      id: '4',
      category: 'travel',
      date: '17/03/2024',
      image: '/image/phuquoc.jpg', // Assuming you have an image for Phu Quoc
      title: 'Thiên Đường Biển Đảo Phú Quốc',
      description: 'Khám phá những bãi biển tuyệt đẹp và trải nghiệm lặn biển ở Phú Quốc.',
      author: 'Admin',
      views: 150,
    },
    {
      id: '5',
      category: 'events',
      date: '16/03/2024',
      image: '/image/festival.jpg', // Assuming you have an image for a festival
      title: 'Festival Hoa Đà Lạt',
      description: 'Tham gia không gian rực rỡ sắc màu tại Festival Hoa Đà Lạt hàng năm.',
      author: 'Admin',
      views: 200,
    },
    {
      id: '6',
      category: 'culture',
      date: '15/03/2024',
      image: '/image/hue.jpg', // Assuming you have an image for Hue
      title: 'Tìm hiểu Cố Đô Huế',
      description: 'Du hành về quá khứ với những di tích lịch sử và văn hóa tại Cố Đô Huế.',
      author: 'Admin',
      views: 90,
    },
    {
      id: '7',
      category: 'food',
      date: '14/03/2024',
      image: '/image/hanoi-food.jpg', // Assuming you have an image for Hanoi food
      title: 'Ẩm Thực Đường Phố Hà Nội',
      description: 'Thưởng thức những món ngon vỉa hè nổi tiếng của Hà Nội.',
      author: 'Admin',
      views: 180,
    },
    {
      id: '8',
      category: 'travel',
      date: '13/03/2024',
      image: '/image/sapa.jpg', // Assuming you have an image for Sapa
      title: 'Chinh Phục Đỉnh Fansipan - Sapa',
      description: 'Trải nghiệm cáp treo lên đỉnh Fansipan và khám phá vẻ đẹp hùng vĩ của Sapa.',
      author: 'Admin',
      views: 250,
    },
    {
      id: '9',
      category: 'events',
      date: '12/03/2024',
      image: '/image/countdown.jpg', // Assuming you have an image for a countdown event
      title: 'Chào Đón Năm Mới Tại TP.HCM',
      description: 'Tham gia không khí sôi động của đêm Countdown tại trung tâm TP.HCM.',
      author: 'Admin',
      views: 300,
    },
    {
      id: '10',
      category: 'culture',
      date: '11/03/2024',
      image: '/image/nhatrang.jpg', // Assuming you have an image for Nha Trang
      title: 'Du Lịch Biển Nha Trang',
      description: 'Tận hưởng nắng vàng, biển xanh tại thành phố biển Nha Trang xinh đẹp.',
      author: 'Admin',
      views: 110,
    },
  ];

  // Filter news by category
  const filteredNews = selectedCategory === 'all' ? allNews : allNews.filter(news => news.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'travel', name: 'Du lịch' },
    { id: 'culture', name: 'Văn hóa' },
    { id: 'food', name: 'Ẩm thực' },
    { id: 'events', name: 'Sự kiện' },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentPage(1); // Reset to first page on category change
                    }}
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
            {currentNews.map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
                  <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 ${
                  news.category === 'travel' ? 'bg-orange-100 text-orange-800' :
                  news.category === 'culture' ? 'bg-yellow-100 text-yellow-700' :
                  news.category === 'food' ? 'bg-red-100 text-red-700' :
                  news.category === 'events' ? 'bg-purple-100 text-purple-700' : ''
                } rounded-full text-xs`}>
                  {categories.find(cat => cat.id === news.category)?.name}
                </span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      <Link
                          to={`/news/${news.id}`}
                          className="text-gray-800 hover:text-teal-600 transition-colors duration-200"
                      >
                        {news.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {news.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Tác giả: {news.author}</span>
                      <span>{news.views} lượt xem</span>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-2">
              <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-100 transition-colors duration-200'}`}
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, index) => (
                  <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-teal-600 text-white hover:bg-teal-700' : 'border-gray-300 text-gray-700 hover:bg-teal-100'} transition-colors duration-200`}
                  >
                    {index + 1}
                  </button>
              ))}
              <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border border-gray-300 rounded-md text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-100 transition-colors duration-200'}`}
              >
                Sau
              </button>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default NewsPage;