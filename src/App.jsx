import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import HomePageManagement from './pages/admin/HomePageManagement.jsx';
import EventsManagement from './pages/admin/EventsManagement.jsx';
import GalleryManagement from './pages/admin/GalleryManagement.jsx';

const MainLayout = () => {
    const location = useLocation();
    
    // Tampilkan Navbar/Footer kecuali di halaman /login atau yang berawalan /admin
    const showHeaderFooter = !location.pathname.startsWith('/admin') && location.pathname !== '/login';

    return (
        <>
            {showHeaderFooter && <Navbar />}
            <main>
                <Routes>
                    {/* Halaman Publik */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    
                    {/* Halaman Auth */}
                    <Route path="/login" element={<AuthPage />} />

                    {/* Halaman Admin dengan Nested Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />}>
                        <Route index element={<HomePageManagement />} />
                        <Route path="home" element={<HomePageManagement />} />
                        <Route path="events" element={<EventsManagement />} />
                        <Route path="gallery" element={<GalleryManagement />} />
                    </Route>
                </Routes>
            </main>
            {showHeaderFooter && <Footer />}
        </>
    );
};

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;