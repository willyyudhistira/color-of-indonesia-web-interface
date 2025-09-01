import React from 'react';
import HeroBgNews from '../assets/about-hero.png'; // Ganti dengan gambar hero yang sesuai
import MainPattern from '../assets/pattern.png';
import NewsImage from '../assets/NewsImg.png'; // Ganti dengan gambar berita

const NewsPage = () => {
    // Data dummy untuk artikel berita
    const newsArticles = [
        {
            id: 1,
            title: 'Ditjen Polpum Kemendagri Terus Berkomitmen Perkuat Ketahanan Budaya',
            excerpt: 'Sebagai wujud meningkatkan rasa cinta terhadap bangsa Indonesia, Direktorat Jenderal (Ditjen) Politik dan Pemerintahan Umum (Polpum) Kementerian Dalam Negeri (Kemendagri) terus berkomitmen dalam memperkuat ketahanan budaya.',
            date: 'Rabu, 26 Juli 2023',
            imageUrl: NewsImage,
        },
        {
            id: 2,
            title: 'Kolaborasi Budaya Internasional: Indonesia Tampil Memukau di Festival Seni Edinburgh',
            excerpt: 'Delegasi seniman Indonesia berhasil memukau penonton internasional di Festival Seni Edinburgh melalui pertunjukan tari dan musik tradisional yang energik dan penuh warna, menuai pujian dari kritikus seni global.',
            date: 'Senin, 14 Agustus 2023',
            imageUrl: NewsImage, // Sebaiknya gunakan gambar berbeda untuk tiap berita
        },
        {
            id: 3,
            title: 'Workshop Membatik untuk Generasi Muda Pecahkan Rekor Partisipasi',
            excerpt: 'Dalam upaya melestarikan warisan budaya, workshop membatik yang diadakan akhir pekan lalu berhasil menarik lebih dari seribu peserta dari kalangan generasi muda, menunjukkan antusiasme yang tinggi terhadap seni tradisional.',
            date: 'Jumat, 01 September 2023',
            imageUrl: NewsImage, // Sebaiknya gunakan gambar berbeda untuk tiap berita
        },
    ];

    return (
        <div className="bg-white">
            <section className="relative h-96 flex items-center justify-center text-white" style={{ backgroundImage: `url(${HeroBgNews})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold">Through The Culture We Become One</h1>
            </section>
            <div className='py-24 relative'>
                <div className="absolute inset-0 opacity-50 bg-repeat-y" style={{ backgroundImage: `url(${MainPattern})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="relative z-10 mx-20 px-6">
                    <section>
                        <h2 className="text-4xl font-bold text-brand-purple mb-10">Latest News</h2>
                        <div className="space-y-8">
                            {newsArticles.map(article => (
                                <div key={article.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                    <img src={article.imageUrl} alt={article.title} className="w-full md:w-1/3 h-60 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{article.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">{article.date}</p>
                                            <button className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-800 transition-colors">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dummy */}
                        <div className="flex justify-center items-center space-x-2 mt-16">
                            <button className="w-10 h-10 rounded-full bg-brand-purple text-white font-bold">&lt;</button>
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

export default NewsPage;