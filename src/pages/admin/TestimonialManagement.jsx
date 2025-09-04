import React, { useState, useEffect } from 'react';
import { FaUpload, FaTrash, FaPen } from 'react-icons/fa';
import useApi from '../../hooks/useApi';
import TestimonialEditModal from '../../components/admin/testimonial/TestimonialEditModal';

const TestimonialManagement = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk form "Tambah Baru"
    const [newTestData, setNewTestData] = useState({ author_name: '', role_title: '', quote: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    
    // State untuk modal edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const api = useApi();

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await api.get('/home/testimonials');
            setTestimonials(response.data.sort((a, b) => a.sort_order - b.sort_order));
        } catch (err) {
            setError('Gagal mengambil data testimoni.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        setNewTestData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!newTestData.author_name || !newTestData.quote) {
            alert('Nama dan Isi Testimoni wajib diisi.');
            return;
        }

        const formData = new FormData();
        formData.append('author_name', newTestData.author_name);
        formData.append('role_title', newTestData.role_title);
        formData.append('quote', newTestData.quote);
        formData.append('is_published', true);
        if (selectedFile) {
            formData.append('avatar_url', selectedFile);
        }

        try {
            setLoading(true);
            setError(null);
            await api.post('/home/testimonials', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert('Testimoni berhasil ditambahkan!');
            await fetchTestimonials();
            setNewTestData({ author_name: '', role_title: '', quote: '' });
            setSelectedFile(null);
            setImagePreview(null);
            document.getElementById('file-input-add').value = null;
        } catch (err) {
            setError('Gagal menambahkan testimoni.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, data, imageFile) => {
        const formData = new FormData();
        formData.append('author_name', data.author_name);
        formData.append('role_title', data.role_title);
        formData.append('quote', data.quote);
        formData.append('is_published', data.is_published);
        if (imageFile) {
            formData.append('avatar_url', imageFile);
        }

        try {
            setLoading(true);
            setError(null);
            await api.put(`/home/testimonials/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert('Testimoni berhasil diperbarui.');
            setIsModalOpen(false);
            await fetchTestimonials();
        } catch (err) {
            setError('Gagal memperbarui testimoni.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Anda yakin ingin menghapus testimoni ini?')) {
            try {
                setLoading(true);
                setError(null);
                await api.delete(`/home/testimonials/${id}`);
                alert('Testimoni berhasil dihapus.');
                await fetchTestimonials();
            } catch (err) {
                setError('Gagal menghapus testimoni.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading && testimonials.length === 0) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="space-y-8">
             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6">Tambah Testimoni Baru</h2>
                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label htmlFor="author_name" className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                            <input type="text" id="author_name" name="author_name" value={newTestData.author_name} onChange={handleInputChange} placeholder="Masukan Nama" className="w-full px-4 py-2 border rounded-lg" required/>
                        </div>
                        <div>
                            <label htmlFor="role_title" className="block text-sm font-medium text-gray-600 mb-1">Sebagai</label>
                            <input type="text" id="role_title" name="role_title" value={newTestData.role_title} onChange={handleInputChange} placeholder="Contoh: Peserta 2024" className="w-full px-4 py-2 border rounded-lg"/>
                        </div>
                        <div>
                            <label htmlFor="quote" className="block text-sm font-medium text-gray-600 mb-1">Isi Testimoni</label>
                            <textarea id="quote" name="quote" rows="5" value={newTestData.quote} onChange={handleInputChange} placeholder="Tulis kata-kata testimoni..." className="w-full px-4 py-2 border rounded-lg" required></textarea>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-600">Foto (Opsional)</label>
                        <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                            {imagePreview ? <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" /> : <span className="text-gray-400">Image Preview</span>}
                        </div>
                        <input id="file-input-add" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0" />
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 disabled:bg-purple-400">
                            <FaUpload />
                            <span>{loading ? 'Menyimpan...' : 'Simpan Testimoni'}</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Daftar Testimoni</h3>
                <div className="space-y-4">
                    {testimonials.map(item => (
                        <div key={item.id} className="flex items-start gap-4 p-3 rounded-md even:bg-gray-50">
                            <img src={item.avatar_url ? `http://localhost:4000${item.avatar_url}` : 'https://via.placeholder.com/100'} alt={item.author_name} className="w-16 h-16 rounded-full object-cover flex-shrink-0 bg-gray-200" />
                            <div className="flex-1">
                                <p className="font-bold text-gray-800">{item.author_name} <span className="text-sm font-normal text-gray-500">- {item.role_title}</span></p>
                                <p className="text-sm text-gray-600 mt-1 italic">"{item.quote}"</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600" title="Hapus"><FaTrash /></button>
                                <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="Perbarui"><FaPen /></button>
                            </div>
                        </div>
                    ))}
                     {testimonials.length === 0 && !loading && <p className="text-gray-500 text-center py-4">Belum ada testimoni.</p>}
                </div>
            </div>
            
            <TestimonialEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={editingItem}
                onSave={handleUpdate}
            />
        </div>
    );
};

export default TestimonialManagement;
