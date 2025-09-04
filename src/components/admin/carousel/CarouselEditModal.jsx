import React, { useState, useEffect } from 'react';

const CarouselEditModal = ({ isOpen, onClose, item, onSave }) => {
    const [formData, setFormData] = useState({
        alt_text: '',
        link_url: '',
    });
    const [isPublished, setIsPublished] = useState(false);
    
    // State BARU untuk file gambar
    const [newImageFile, setNewImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData({
                alt_text: item.alt_text || '',
                link_url: item.link_url || '',
            });
            setIsPublished(item.is_published || false);
            setImagePreview(`http://localhost:4000${item.image_url}`);
            setNewImageFile(null);
        }
    }, [item]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(item.id, {...formData, is_published: isPublished}, newImageFile);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">Edit Detail Carousel</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom Kiri: Preview & Upload Gambar */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Ganti Gambar (Opsional)</label>
                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg p-1" />
                                ) : (
                                    <span className="text-gray-400">Image Preview</span>
                                )}
                            </div>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>

                        {/* Kolom Kanan: Input Teks */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="alt_text" className="block text-sm font-medium text-gray-700">Teks Alternatif (Alt Text)</label>
                                <input type="text" id="alt_text" name="alt_text" value={formData.alt_text} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                            </div>
                            <div>
                                <label htmlFor="link_url" className="block text-sm font-medium text-gray-700">Link URL (Opsional)</label>
                                <input type="text" id="link_url" name="link_url" value={formData.link_url} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                            </div>
                            <div className="flex items-center">
                                <input id="is_published" name="is_published" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 text-purple-600 border-gray-300 rounded"/>
                                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Publikasikan</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-brand-purple text-white rounded-md hover:bg-purple-800">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarouselEditModal;