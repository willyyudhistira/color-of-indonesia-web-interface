import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => { setIsScrolled(window.scrollY > 20) };
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navLinks = [
		{ title: 'Home', path: '/' }, { title: 'About Us', path: '/about' },
		{ title: 'Events', path: '/events' }, { title: 'Gallery', path: '/gallery' },
		{ title: 'News', path: '/news' }, { title: 'Contact Us', path: '/contact' },
	];
	// const isHomePage = location.pathname === '/';

	const navTextColor = isScrolled ? 'text-gray-800 font-bold' : 'text-white';

	return (
        <nav className={`m fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg' : 'bg-white/25'} backdrop-blur-sm`}>
            <div className="mx-15 px-6 flex justify-between items-center h-20">
                <Link to="/" className="flex-shrink-0">
                    <img src="/assets/logo.png" alt="Color Of Indonesia Logo" className="h-12" />
                </Link>
                
                {/* Terapkan variabel navTextColor di sini */}
                <div className={`hidden md:flex space-x-8 items-center ${navTextColor}`}>
                    {navLinks.map((link) => (
                        <NavLink key={link.title} to={link.path}
                            className={({ isActive }) => `font-medium transition-colors hover:text-purple-700 ${isActive ? "text-purple-900 font-bold" : ""}`}>
                            {link.title}
                        </NavLink>
                    ))}
                </div>

                {/* Terapkan variabel navTextColor di sini juga */}
                <div className={`hidden md:flex items-center space-x-4 ${navTextColor}`}>
                    <FaUserCircle size={24} className="cursor-pointer hover:text-purple-700" />
                </div>

                {/* Terapkan pada tombol menu mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className={`${navTextColor} focus:outline-none`}>
                        {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile tidak perlu diubah karena latar belakangnya selalu gelap */}
            <div className={`md:hidden bg-brand-purple/95 backdrop-blur-sm absolute top-20 left-0 w-full transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="flex flex-col items-center space-y-6 py-8">
                    {navLinks.map((link) => (
                        <NavLink key={link.title} to={link.path} onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `text-white text-xl font-semibold ${isActive ? "text-yellow-400" : ""}`}>
                            {link.title}
                        </NavLink>
                    ))}
                    <div className="border-t border-gray-600 w-1/2 my-4"></div>
                    <div className="flex items-center space-x-4 text-white">
                        <FaUserCircle size={24} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;