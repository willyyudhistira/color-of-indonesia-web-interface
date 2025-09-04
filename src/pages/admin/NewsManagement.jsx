import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaLink } from 'react-icons/fa';

const NewsManagement = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const [newsArticles, setNewsArticles] = useState([
        {
            id: 1,
            title: 'Ditjen Polpum Kemendagri Terus Berkomitmen Perkuat Ketahanan Budaya',
            excerpt: 'Sebagai wujud meningkatkan rasa cinta terhadap bangsa Indonesia...',
            source_name: 'Suara.com',
            source_url: 'https://www.suara.com/news/2023/07/26/contoh-berita',
            image_url: 'https://via.placeholder.com/300x200?text=Berita+1',
            published_at: new Date('2023-07-26'),
            is_published: true,
        },
        {
            id: 2,
            title: 'Kolaborasi Budaya Internasional: Indonesia Tampil Memukau',
            excerpt: 'Delegasi seniman Indonesia berhasil memukau penonton internasional...',
            source_name: 'Kompas',
            source_url: 'https://www.kompas.com/news/2023/08/14/contoh-berita',
            image_url: 'https://via.placeholder.com/300x200?text=Berita+2',
            published_at: new Date('2023-08-14'),
            is_published: false,
        },
    ]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        // Container utama dengan layout satu kolom
        <div className="space-y-8">
            {/* Form Input */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah / Edit Berita</h2>
                <form className="space-y-4">
                    {/* Baris 1: Judul */}
                    <div>
                        <label htmlFor="news-title" className="block text-sm font-medium text-gray-600 mb-1">Judul Berita</label>
                        <input type="text" id="news-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                    </div>

                    {/* Baris 2: Kutipan (Excerpt) */}
                    <div>
                        <label htmlFor="news-excerpt" className="block text-sm font-medium text-gray-600 mb-1">Kutipan (Excerpt)</label>
                        <textarea id="news-excerpt" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                    </div>

                    {/* Baris 3: Nama & URL Sumber */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="news-source-name" className="block text-sm font-medium text-gray-600 mb-1">Nama Sumber</label>
                            <input type="text" id="news-source-name" placeholder="Contoh: Kompas.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="news-source-url" className="block text-sm font-medium text-gray-600 mb-1">URL Sumber</label>
                            <input type="url" id="news-source-url" placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>

                    {/* Baris 4: Upload Gambar & Tanggal */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Gambar Berita</label>
                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" /> : <span className="text-gray-400">Image Preview</span>}
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                        <div>
                            <label htmlFor="news-published-at" className="block text-sm font-medium text-gray-600 mb-1">Tanggal Publikasi</label>
                            <input type="date" id="news-published-at" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>
                    
                    {/* Baris 5: Opsi & Tombol Simpan */}
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="news-is-published" className="h-4 w-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" defaultChecked />
                            <label htmlFor="news-is-published" className="text-sm font-medium text-gray-700">Publikasikan</label>
                        </div>
                        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <span>Simpan Berita</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Berita */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Berita</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {newsArticles.map(article => (
                        <div key={article.id} className="flex items-start gap-4 p-3 rounded-md border border-gray-200">
                           <img src={article.image_url} alt={article.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-1">
                                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 ${article.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                                    {article.is_published ? 'Published' : 'Draft'}
                                </span>
                                <h4 className="font-bold text-gray-800">{article.title}</h4>
                                <p className="text-sm text-gray-500">{article.excerpt}</p>
                                <p className="text-xs text-gray-400 mt-1">{article.source_name} - {new Date(article.published_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash size={14} /></button>
                                <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsManagement;