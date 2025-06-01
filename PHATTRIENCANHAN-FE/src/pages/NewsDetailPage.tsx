import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:3000'; // Your API base URL

// Assuming NewsDetailItem structure matches the backend News entity
interface NewsDetailItem {
  id: number; // Backend returns number
  title: string;
  category: string;
  date: string; // Backend returns Date, might need formatting
  author: string;
  views: number;
  image: string;
  content: string; // Full content from backend
  // Related news data might be structured differently or fetched separately
  relatedNews?: { id: number; title: string; image: string; date: string }[]; // Assuming backend returns this structure for related news
}

const NewsDetailPage: React.FC = () => {
  // Get the news ID from the URL parameters
  const { id } = useParams<{ id: string }>(); // id is string from URL


  const [news, setNews] = useState<NewsDetailItem | null>(null); // State to hold news data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Effect to fetch news detail when the component mounts or id changes
  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the backend API to fetch news detail by id
        const response = await fetch(`${API_BASE_URL}/news/${id}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data: NewsDetailItem = await response.json();
        console.log('Fetched news detail:', data);

        setNews(data); // Set fetched data
        setLoading(false);

        // TODO: Fetch related news if your backend has a specific endpoint for it,
        // or if the main news detail endpoint includes related news data.

      } catch (err: any) {
        console.error('Error fetching news detail:', err);
        setError('Không thể tải chi tiết tin tức. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    } else {
      // Handle case where id is not present in URL (shouldn't happen with proper routing)
      setError('Không tìm thấy ID tin tức trong URL.');
      setLoading(false);
    }
  }, [id]); // Rerun effect when id changes

  // Show loading or error state
  if (loading) return <div className="text-center py-12">Đang tải chi tiết tin tức...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Lỗi: {error}</div>;
  if (!news) return <div className="text-center py-12">Không tìm thấy tin tức.</div>;

  // You might need date formatting here if news.date is a Date object from backend
  // const formattedDate = news.date instanceof Date ? news.date.toLocaleDateString() : news.date; // Example formatting

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
                // Prepend API_BASE_URL if image path is relative
                src={news.image.startsWith('http') ? news.image : `${API_BASE_URL}${news.image}`}
                alt={news.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  {/* Display category - You might need a helper function to map category ID to display name */}
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{news.category}</span>
                  {/* Display formatted date */}
                  <span className="text-sm text-gray-500">{news.date}</span> {/* Apply formatting here if needed */}
                  <span className="text-sm text-gray-500">
                    Tác giả: {news.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {news.views} lượt xem
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{news.title}</h1>
                {/* Display news content - Assuming content can contain HTML */}
                <div
                  className="prose max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related News section - Assuming backend provides this or fetch separately */}
            {/* If your backend /news/:id endpoint returns relatedNews directly: */}
            {news.relatedNews && news.relatedNews.length > 0 && (
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
                          // Prepend API_BASE_URL if image path is relative
                          src={item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          {/* Display formatted date for related news */}
                          <p className="text-sm text-gray-500 mt-1">
                            {item.date} {/* Apply formatting here if needed */}
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