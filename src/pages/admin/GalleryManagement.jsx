import React, { useState } from 'react';
import { FaInfoCircle, FaImages, FaSquare, FaMobileAlt, FaUpload } from 'react-icons/fa';

const GalleryManagement = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Data untuk kartu statistik
    const stats = [
        {
            title: 'Total Foto',
            value: 36,
            icon: <FaImages className="text-purple-500" size={24} />,
            color: 'text-purple-500'
        },
        {
            title: 'Rasio 1:1',
            value: 18,
            icon: <FaSquare className="text-pink-500" size={24} />,
            color: 'text-pink-500'
        },
        {
            title: 'Rasio 4:5',
            value: 18,
            icon: <FaMobileAlt className="text-sky-500" size={24} />,
            color: 'text-sky-500'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Note Box */}
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg flex items-start gap-4">
                <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                    <p className="font-bold">Panduan Upload Foto Galeri</p>
                    <ul className="list-disc list-inside text-sm mt-2">
                        <li>Upload Foto dengan rasio **1:1** (persegi) atau **4:5** (portrait).</li>
                        <li>Gunakan foto dengan resolusi tinggi (HD - 4K) untuk hasil terbaik.</li>
                        <li>Satu halaman galeri terdiri dari 3 buah foto (rasio 1:1) dan 3 buah foto (rasio 4:5).</li>
                        <li>Pergi Ke Halaman **Gallery** publik untuk melihat dan menghapus foto.</li>
                    </ul>
                </div>
            </div>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-full">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bagian Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Upload Foto Baru ke Galeri</h3>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                        ) : (
                            <span className="text-gray-400">Image Preview</span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="photo-upload" className="sr-only">Pilih foto</label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100"
                            />
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Upload Foto</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryManagement;