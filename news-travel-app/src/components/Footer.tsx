import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">News & Travel</h3>
            <p className="text-gray-400">
              Cung cấp thông tin tin tức và tour du lịch chất lượng cao cho mọi người.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-400 hover:text-white">
                  Tour du lịch
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
              <li>Điện thoại: (84) 123-456-789</li>
              <li>Email: info@newstravel.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} News & Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 