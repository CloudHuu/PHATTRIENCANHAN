import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {logout} from '../store/slices/authSlice'; // Assuming you have a logout action in authSlice

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
    const [hideDropdownTimeout, setHideDropdownTimeout] = useState<number | null>(null); // State to hold timeout ID
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

    const handleLogout = () => {
        // Clear token and user info from storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // Dispatch logout action to update Redux state
        dispatch(logout()); // Assuming your authSlice has a logout action
        setIsDropdownOpen(false);
        navigate('/login'); // Redirect to login page
    };

    // Function to handle mouse entering the user info area (and dropdown)
    const handleMouseEnterUser = () => {
        // Clear any existing timeout to prevent the dropdown from hiding
        if (hideDropdownTimeout) {
            clearTimeout(hideDropdownTimeout);
            setHideDropdownTimeout(null);
        }
        setIsDropdownOpen(true);
    };

    // Function to handle mouse leaving the user info area (and dropdown)
    const handleMouseLeaveUser = () => {
        // Set a timeout to hide the dropdown after a short delay
        const timeoutId = window.setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200); // 200ms delay (adjust as needed)
        setHideDropdownTimeout(timeoutId);
    };

    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/"
                          className="text-2xl font-bold text-primary transition-colors duration-300 hover:text-primary-dark">
                        <img src="/image/logo1.png" alt="Logo" className="w-110 h-12"/>
                    </Link>

                    {/* Desktop Navigation and Auth */}
                    {/* Restructured for Logo | Centered Menu | Auth */}
                    <div className="hidden md:flex items-center flex-grow"> {/* Main container for menu and auth, allows menu to push to center */}
                        {/* Menu Items - Centered in available space */}
                        <div className="flex-grow flex justify-center items-center space-x-8"> {/* This div takes available space and centers its content */}
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
                        </div>
                    </div>

                    {/* Auth/User Info - aligned to the right */}
                    <div className="hidden md:flex items-center space-x-4 ml-auto pr-4"> {/* Use ml-auto to push it to the right, pr-4 for padding */}
                        {isAuthenticated ? (
                            <div className="relative" onMouseEnter={handleMouseEnterUser} onMouseLeave={handleMouseLeaveUser}> {/* Use new handlers */}
                                <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-primary transition-colors duration-300">
                                    {/* User Icon (replace with a proper icon like Font Awesome or SVG) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{user?.fullName || user?.email}</span> {/* Display fullName or email */}
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20" onMouseEnter={handleMouseEnterUser}>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                        <Link
                                             to="/change-password" // Assuming you have a route for changing password
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Đổi mật khẩu
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* Styled Login Button */}
                                <Link
                                    to="/login"
                                    className="btn btn-outline-primary transition-colors duration-300" // Applied button styling, assuming btn-outline-primary is available or using Tailwind classes for outline
                                >
                                    Đăng nhập
                                </Link>
                                {/* Styled Register Button */}
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
                         {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <>
                                {/* Mobile Profile Link */}
                                <Link
                                    to="/profile"
                                    className="block text-gray-600 transition-colors duration-300 hover:text-primary"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        // Optionally open mobile dropdown here if implemented
                                    }}
                                >
                                   Thông tin người dùng ({user?.fullName || user?.email})
                                </Link>
                                {/* Mobile Logout Button */}
                                <button className="btn btn-primary w-full transition-colors duration-300" onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}>
                                    Đăng xuất
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