import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);

    const menuItems = [
        {
            name: "TRANG CHỦ",
            href: "/",
        },
        {
            name: "DU LỊCH",
            href: "/tours",
        },
        {
            name: "INBOUND",
            href: "/tours",
        },
        {
            name: "tin tức",
            href: "/news",
        },
        {
            name: "GIỚI THIỆU",
            href: "/about",
        },
        {
            name: "LIÊN HỆ",
            href: "/contacts",
        }
    ]

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/"
                          className="text-2xl font-bold text-primary transition-colors duration-300 hover:text-primary-dark">
                        <img src="/image/logo1.png" alt="Logo" className="w-110 h-12"/>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="relative px-2 py-1 text-gray-600 transition-all duration-300 uppercase hover:text-primary after:content-[''] after:block after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                                style={{overflow: 'hidden'}}
                            >
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile"
                                      className="text-gray-600 transition-colors duration-300 hover:text-primary">
                                    {user?.name}
                                </Link>
                                <button className="btn btn-primary transition-colors duration-300">Đăng xuất</button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 transition-colors duration-300 hover:text-primary"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-primary transition-colors duration-300"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4">
                        <Link
                            to="/news"
                            className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tin tức
                        </Link>
                        <Link
                            to="/tours"
                            className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Tour du lịch
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {user?.name}
                                </Link>
                                <button className="btn btn-primary w-full transition-colors duration-300">Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-primary w-full block text-center transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header; 