import React from 'react';
import HeroBgGallery from '../assets/hero-bg.png'; // Ganti dengan gambar hero yang sesuai
import MainPattern from '../assets/pattern.png';

// Impor semua gambar galeri Anda
import Img1 from '../assets/about-hero.png';
import Img2 from '../assets/contact-hero.png';
import Img3 from '../assets/hero-bg.png';
import Img4 from '../assets/NewsImg.png';
import Img5 from '../assets/EventsImg (1).png';
import Img6 from '../assets/EventsImg (2).png';
import Img7 from '../assets/EventsImg (3).png';
import Img8 from '../assets/EventsImg (4).png';
import Img9 from '../assets/about-hero.png';

const GalleryPage = () => {
    // Data dummy untuk gambar di galeri
    const galleryImages = [
        { id: 1, imageUrl: Img1, alt: 'A vibrant cultural performance' },
        { id: 2, imageUrl: Img2, alt: 'Youth camp participants smiling' },
        { id: 3, imageUrl: Img3, alt: 'Detailed traditional dance costume' },
        { id: 4, imageUrl: Img4, alt: 'A group photo in traditional attire' },
        { id: 5, imageUrl: Img5, alt: 'Dancers in a dynamic pose' },
        { id: 6, imageUrl: Img6, alt: 'A large group workshop session' },
        { id: 7, imageUrl: Img7, alt: 'Another traditional performance' },
        { id: 8, imageUrl: Img8, alt: 'Close-up of a dancer\'s expression' },
        { id: 9, imageUrl: Img9, alt: 'Community gathering event' },
    ];

    return (
        <div className="bg-white relative">
            <div 
                className="absolute inset-0 opacity-50 z-0" // Atur opasitas & z-index
                style={{
                    backgroundImage: `url(${MainPattern})`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'top',
                    backgroundSize: 'fill'
                }}
            ></div>
            <div className='relative z-10'>
                <section className="relative h-96 flex items-center justify-center text-white" style={{ backgroundImage: `url(${HeroBgGallery})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-center px-4">Capturing Moments<br/>Creating Memories</h1>
                </section>

                <div className="mx-20 px-6">
                    <section>
                        <h2 className="text-4xl font-bold text-brand-purple mb-10">Gallery</h2>
                        
                        {/* Masonry Grid Container */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {galleryImages.map(image => (
                                <div key={image.id} className="break-inside-avoid">
                                    <img 
                                        src={image.imageUrl} 
                                        alt={image.alt} 
                                        className="w-full h-auto object-cover rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dummy */}
                        <div className="flex justify-center items-center space-x-2 mt-16">
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">&lt;</button>
                            <button className="w-10 h-10 rounded-full bg-brand-purple text-white font-bold">1</button>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">2</button>
                            <span className="text-gray-500">...</span>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">8</button>
                            <button className="w-10 h-10 rounded-full bg-white text-gray-700 font-bold hover:bg-purple-100">&gt;</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;