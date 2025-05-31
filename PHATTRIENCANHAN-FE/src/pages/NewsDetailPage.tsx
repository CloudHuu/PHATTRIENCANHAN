import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface NewsDetailItem {
  id: string;
  title: string;
  category: string;
  date: string; // Consider using Date type
  author: string;
  views: number;
  image: string;
  content: string;
  relatedNews?: { id: string; title: string; image: string; date: string }[]; // Consider using Date type
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [news, setNews] = useState<NewsDetailItem | null>(null); // State to hold news data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call to fetch news detail by id
        // Example: const response = await fetch(`/api/news/${id}`);
        // const data: NewsDetailItem = await response.json();

        // Simulate fetching data
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Mock data structure matching the previous mock, replace with fetched data
        const mockNewsData: NewsDetailItem = {
          id: id || '',
          title: 'Khám phá vẻ đẹp của Đà Nẵng (Fetched)',
          category: 'Du lịch',
          date: '20/03/2024',
          author: 'Admin',
          views: 100,
          image: '/image/danang0.jpg',
          content: '<p>Nội dung chi tiết của bài viết...</p>',
          relatedNews: [
            {
              id: '2',
              title: 'Tin tức liên quan 1 (Fetched)',
              image: 'https://via.placeholder.com/400x250',
              date: '19/03/2024',
            },
          ],
        };

        setNews(mockNewsData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]); // Rerun effect when id changes

   // Show loading or error state
  if (loading) return <div className="text-center py-12">Đang tải chi tiết tin tức...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Lỗi: {error}</div>;
  if (!news) return <div className="text-center py-12">Không tìm thấy tin tức.</div>;

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
            {news.relatedNews && news.relatedNews.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Tin tức liên quan</h2>
                <div className="space-y-6">
                  {news.relatedNews.map((item, index) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage; 