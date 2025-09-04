import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaImages, FaSignOutAlt, FaStar, FaComment, FaNewspaper, FaBullhorn } from 'react-icons/fa';
import Logo from '../../assets/logo.png'; // Pastikan path ini benar
import { useAuth } from '../../hooks/AuthContext';

// Fungsi helper untuk mendapatkan judul dari path URL
const getTitleFromPath = (path) => {
    if (path.endsWith('/home') || path.endsWith('/dashboard')) return 'Home Page Management';
    if (path.endsWith('/events')) return 'Events Management';
    if (path.endsWith('/gallery')) return 'Gallery Management';
    if (path.endsWith('/sponsors')) return 'Sponsor Management';
    if (path.endsWith('/testimonials')) return 'Testimonial Management';
    if (path.endsWith('/news')) return 'News Management';
    if (path.endsWith('/main-events')) return 'Main Event Management';
    return 'Dashboard';
};

const AdminDashboard = () => {
    const location = useLocation();
    const currentPageTitle = getTitleFromPath(location.pathname);
    const { user, logout } = useAuth();

    const adminMenus = [
        { name: 'Home Page', path: '/admin/dashboard/home', icon: <FaHome /> },
        { name: 'Main Events', path: '/admin/dashboard/main-events', icon: <FaBullhorn /> },
        { name: 'Events', path: '/admin/dashboard/events', icon: <FaCalendarAlt /> },
        { name: 'Gallery', path: '/admin/dashboard/gallery', icon: <FaImages /> },
        { name: 'Sponsors', path: '/admin/dashboard/sponsors', icon: <FaStar /> },
        { name: 'Testimonials', path: '/admin/dashboard/testimonials', icon: <FaComment /> },
        { name: 'News', path: '/admin/dashboard/news', icon: <FaNewspaper /> },
    ];

    const handleLogout = () => {
        if (window.confirm('Apakah Anda yakin ingin logout?')) {
            logout(); // Panggil fungsi logout dari context
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar (Tetap sama) */}
            <aside className="w-64 bg-brand-purple text-white flex flex-col flex-shrink-0">
                <div className="h-20 flex items-center justify-center px-4 border-b border-purple-700">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={Logo} alt="Logo" className="h-10" />
                        <span className="text-xl font-bold">Admin Panel</span>
                    </Link>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <h2 className="px-4 mb-2 text-xs font-bold uppercase text-gray-400">
                        Management Content
                    </h2>
                    {adminMenus.map(menu => (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            end={menu.path.endsWith('home') || menu.path.endsWith('dashboard')}
                            className={({ isActive }) => 
                                `w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-3 ${isActive ? 'bg-brand-pink text-white font-semibold' : 'text-gray-300 hover:bg-purple-700 hover:text-white'}`
                            }
                        >
                            {menu.icon}{menu.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-purple-700">
                     <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-3 text-gray-300 hover:bg-red-500 hover:text-white"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>
            
            {/* Area Konten Utama */}
            <div className="flex-1 flex flex-col">
                {/* ======== NAVBAR ADMIN (BARU) ======== */}
                <header className="bg-white shadow-sm p-4 border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">{currentPageTitle}</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-600">Admin Name</span>
                        </div>
                    </div>
                </header>
                {/* ==================================== */}

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {/* Outlet akan me-render konten halaman di sini */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;