import React, { useState, useEffect } from 'react';

const SponsorBannerEditModal = ({ isOpen, onClose, item, onSave }) => {
    const [formData, setFormData] = useState({ name: '', link_url: '' });
    const [newImageFile, setNewImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (item) {
             setFormData({
                name: item.name || '',
                link_url: item.link_url || '',
            });
            setImagePreview(item.image_url ? `http://localhost:4000${item.image_url}` : null);
            setNewImageFile(null);
        }
    }, [item]);

    if (!isOpen) return null;

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(item.id, formData, newImageFile);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-6">Edit Banner Sponsor</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Nama Sponsor</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full border rounded-md py-2 px-3"/>
                    </div>
                    <div>
                        <label htmlFor="link_url" className="block text-sm font-medium">Link URL</label>
                        <input type="url" name="link_url" value={formData.link_url} onChange={handleChange} className="mt-1 w-full border rounded-md py-2 px-3"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Ganti Banner</label>
                        <div className="mt-1 w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                             {imagePreview && <img src={imagePreview} alt="Preview" className="h-full object-contain p-2"/>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 cursor-pointer"/>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-brand-purple text-white rounded-md">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SponsorBannerEditModal;
