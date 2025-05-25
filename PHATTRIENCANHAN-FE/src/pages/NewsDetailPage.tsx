import React from 'react';
import { useParams, Link } from 'react-router-dom';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - In real app, this would come from an API
  const news = {
    id: id,
    title: 'Khám phá vẻ đẹp của Đà Nẵng',
    category: 'Du lịch',
    date: '20/03/2024',
    author: 'Admin',
    views: 100,
    image: 'https://via.placeholder.com/1200x600',
    content: `
      <p>Đà Nẵng - thành phố biển xinh đẹp nằm ở miền Trung Việt Nam, là một điểm đến lý tưởng cho du khách trong và ngoài nước. Với những bãi biển tuyệt đẹp, văn hóa phong phú và ẩm thực đặc sắc, Đà Nẵng đang ngày càng khẳng định vị thế của mình trên bản đồ du lịch thế giới.</p>

      <h2>Những điểm đến không thể bỏ qua</h2>
      <p>1. Bãi biển Mỹ Khê: Được tạp chí Forbes bình chọn là một trong những bãi biển đẹp nhất thế giới, Mỹ Khê nổi tiếng với bãi cát trắng mịn và làn nước trong xanh.</p>
      <p>2. Bán đảo Sơn Trà: Nơi đây không chỉ có ngọn hải đăng cổ kính mà còn là điểm ngắm toàn cảnh thành phố tuyệt đẹp.</p>
      <p>3. Ngũ Hành Sơn: Quần thể núi đá vôi với những hang động và chùa chiền cổ kính.</p>

      <h2>Ẩm thực đặc sắc</h2>
      <p>Đà Nẵng nổi tiếng với nhiều món ăn đặc sắc như:</p>
      <ul>
        <li>Mì Quảng</li>
        <li>Bánh tráng cuốn thịt heo</li>
        <li>Bún chả cá</li>
        <li>Bánh xèo</li>
      </ul>

      <h2>Văn hóa và lễ hội</h2>
      <p>Thành phố này còn nổi tiếng với các lễ hội văn hóa đặc sắc như:</p>
      <ul>
        <li>Lễ hội pháo hoa quốc tế</li>
        <li>Lễ hội ẩm thực</li>
        <li>Các lễ hội truyền thống của người dân địa phương</li>
      </ul>
    `,
    relatedNews: [
      {
        id: '2',
        title: 'Lễ hội đèn lồng Hội An',
        image: 'https://via.placeholder.com/400x250',
        date: '19/03/2024',
      },
      {
        id: '3',
        title: 'Đặc sản ẩm thực miền Trung',
        image: 'https://via.placeholder.com/400x250',
        date: '18/03/2024',
      },
    ],
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary transition-colors duration-300">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/news" className="text-gray-500 hover:text-primary transition-colors duration-300">
            Tin tức
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900">{news.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{news.category}</span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                  <span className="text-sm text-gray-500">
                    Tác giả: {news.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {news.views} lượt xem
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{news.title}</h1>
                <div
                  className="prose max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Tin tức liên quan</h2>
              <div className="space-y-6">
                {news.relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="block group transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage; 