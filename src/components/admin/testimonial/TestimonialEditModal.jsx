import React, { useState, useEffect } from 'react';

const TestimonialEditModal = ({ isOpen, onClose, item, onSave }) => {
    const [formData, setFormData] = useState({ author_name: '', role_title: '', quote: '' });
    const [isPublished, setIsPublished] = useState(false);
    const [newImageFile, setNewImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData({
                author_name: item.author_name || '',
                role_title: item.role_title || '',
                quote: item.quote || '',
            });
            setIsPublished(item.is_published || false);
            setImagePreview(item.avatar_url ? `http://localhost:4000${item.avatar_url}` : null);
            setNewImageFile(null);
        }
    }, [item]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(item.id, { ...formData, is_published: isPublished }, newImageFile);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                <h3 className="text-xl font-bold mb-6">Edit Testimoni</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700">Nama</label>
                            <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="role_title" className="block text-sm font-medium text-gray-700">Sebagai</label>
                            <input type="text" name="role_title" value={formData.role_title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div>
                            <label htmlFor="quote" className="block text-sm font-medium text-gray-700">Isi Testimoni</label>
                            <textarea name="quote" rows="4" value={formData.quote} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"></textarea>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Ganti Foto</label>
                        <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0" />
                         <div className="flex items-center pt-4">
                            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 rounded"/>
                            <label className="ml-2 block text-sm">Publikasikan</label>
                        </div>
                    </div>
                    <div className="md:col-span-3 flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-brand-purple text-white rounded-md">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestimonialEditModal;
