import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaInfoCircle } from 'react-icons/fa';

const HomePageManagement = () => {
    const [imagePreview, setImagePreview] = useState(null);

    // 1. Data Konten dalam Array
    // Semua informasi untuk daftar konten disimpan di sini.
    const [homeContents, setHomeContents] = useState([
        { id: 1, name: 'Konten 1 (Default)', status: 'Berhasil', isDefault: true },
        { id: 2, name: 'Konten 2', status: 'Berhasil', isDefault: false },
        { id: 3, name: 'Konten 3', status: 'Kosong', isDefault: false },
        { id: 4, name: 'Konten 4', status: 'Kosong', isDefault: false },
    ]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Membuat URL sementara untuk preview gambar
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            {/* Note Box */}
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mb-8 flex items-start gap-4">
                <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" size={20}/>
                <div>
                    <p className="font-bold">Informasi Penting</p>
                    <ul className="list-disc list-inside text-sm mt-2">
                        <li>Upload Foto dengan dimensi **lebar = 1200px** dan **tinggi = 800px**.</li>
                        <li>Gunakan foto dengan resolusi tinggi (HD - 4K) untuk hasil terbaik.</li>
                        <li>Konten maksimal berjumlah 4 buah, 1 konten lainnya adalah default dan tidak dapat diubah.</li>
                    </ul>
                </div>
            </div>

            {/* Daftar Konten */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Daftar Konten Hero</h3>
                <div className="space-y-4">
                    
                    {/* 2. Render Dinamis dengan .map() */}
                    {homeContents.map(content => (
                        <div key={content.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                            {/* Kolom Content */}
                            <span className="font-semibold text-gray-600">{content.name}</span>
                            
                            {/* Kolom Status */}
                            <span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${content.status === 'Berhasil' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {content.status}
                                </span>
                            </span>

                            {/* Kolom Aksi */}
                            <div className="flex items-center gap-2">
                                {content.isDefault ? (
                                    <span className="text-sm text-gray-400 italic">Default</span>
                                ) : (
                                    <>
                                        <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                        <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bagian Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Upload Foto Baru</h3>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                        ) : (
                            <span className="text-gray-400">Image Preview</span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        <button className="w-full flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Upload Konten</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageManagement;