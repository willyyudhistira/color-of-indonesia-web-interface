import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen } from 'react-icons/fa';

const TestimonialManagement = () => {
    const [imagePreview, setImagePreview] = useState(null);

    // Data dummy untuk daftar testimoni yang sudah ada
    const [testimonials, setTestimonials] = useState([
        { id: 1, name: 'Pegiat Pengirim', quote: 'Setiap event membawa Anda lebih dekat ke impian Anda untuk melanjutkan jenjang studi...', imageUrl: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Peserta 2024', quote: 'Pengalaman yang luar biasa! Saya belajar banyak tentang budaya lain...', imageUrl: 'https://via.placeholder.com/100' },
    ]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="space-y-8">
            {/* Form untuk Menambah Testimoni Baru */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Tambah Testimoni Baru</h2>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Kolom Kiri: Input Teks */}
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label htmlFor="testimonial-name" className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                            <input type="text" id="testimonial-name" placeholder="Masukan Nama" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="testimonial-name" className="block text-sm font-medium text-gray-600 mb-1">Sebagai</label>
                            <input type="text" id="testimonial-name" placeholder="Contoh: Peserta 2024" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="testimonial-quote" className="block text-sm font-medium text-gray-600 mb-1">Isi Testimoni</label>
                            <textarea id="testimonial-quote" rows="5" placeholder="Tulis kata-kata testimoni di sini..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                        </div>
                    </div>

                    {/* Kolom Kanan: Upload Foto */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-600">Foto</label>
                        <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            {imagePreview ? <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" /> : <span className="text-gray-400">Image Preview</span>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                    </div>

                    {/* Tombol Simpan */}
                    <div className="md:col-span-3 flex justify-end">
                        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Simpan Testimoni</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Testimoni yang Sudah Ada */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Daftar Testimoni</h3>
                <div className="space-y-4">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="flex items-center gap-4 p-3 rounded-md even:bg-gray-50">
                            <img src={testimonial.imageUrl} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                            <div className="flex-1">
                                <p className="font-bold text-gray-800">{testimonial.name}</p>
                                <p className="text-sm text-gray-500 italic">"{testimonial.quote.substring(0, 80)}..."</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialManagement;