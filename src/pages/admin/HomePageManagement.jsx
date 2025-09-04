import React, { useEffect, useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaInfoCircle } from 'react-icons/fa';
import useApi from '../../hooks/useApi'; // <-- Import custom hook
import CarouselEditModal from '../../components/admin/carousel/CarouselEditModal';

const HomePageManagement = () => {
    const MAX_ITEMS = 4; // Batas maksimal item carousel

    const [carouselItems, setCarouselItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const api = useApi();

   // Fungsi untuk mengambil data
    const fetchCarouselItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('/home/carousel');
            const sortedItems = response.data.sort((a, b) => a.sort_order - b.sort_order);
            setCarouselItems(sortedItems);
        } catch (err) {
            setError('Gagal mengambil data carousel.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Mengambil data saat komponen dimuat
    useEffect(() => {
        fetchCarouselItems();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Silakan pilih file gambar terlebih dahulu.');
            return;
        }
        if (carouselItems.length >= 4) {
            alert('Jumlah konten carousel sudah maksimal (4). Hapus salah satu untuk menambah yang baru.');
            return;
        }

        const formData = new FormData();
        formData.append('image_url', selectedFile);
        // Anda bisa menambahkan input lain untuk field di bawah ini
        formData.append('alt_text', `Gambar Carousel #${carouselItems.length + 1}`);
        formData.append('is_published', true);

        try {
        setLoading(true);
        setError(null); 

        await api.post('/home/carousel', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        await fetchCarouselItems();

        alert('Upload berhasil!');

        setSelectedFile(null);
        setImagePreview(null);
        if(document.getElementById('file-upload-input')) {
            document.getElementById('file-upload-input').value = null;
        }
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mengunggah gambar.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            try {
                setLoading(true);
                await api.delete(`/home/carousel/${id}`);
                alert('Item berhasil dihapus.');
                fetchCarouselItems(); // Muat ulang data
            } catch (err) {
                setError('Gagal menghapus item.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleUpdate = async (id, data, imageFile) => {
        const formData = new FormData();
        
        // Tambahkan file gambar HANYA jika ada yang baru dipilih
        if (imageFile) {
            formData.append('image_url', imageFile);
        }

        // Tambahkan sisa data teks
        formData.append('alt_text', data.alt_text);
        formData.append('link_url', data.link_url);
        formData.append('is_published', data.is_published);

        try {
            setLoading(true);
            await api.put(`/home/carousel/${id}`, formData, {
                 headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Item berhasil diperbarui.');
            setIsModalOpen(false);
            setEditingItem(null);
            fetchCarouselItems();
        } catch (err) {
            setError('Gagal memperbarui item.');
        } finally {
            setLoading(false);
        }
    };

    const handleSortOrderChange = async (id, newOrder) => {
        // Update state secara optimis untuk UX yang lebih baik
        const updatedItems = carouselItems.map(item => 
            item.id === id ? { ...item, sort_order: newOrder } : item
        );
        setCarouselItems(updatedItems);

        try {
            await api.put(`/home/carousel/${id}`, { sort_order: newOrder });
            // Muat ulang data untuk memastikan konsistensi
            fetchCarouselItems();
        } catch (err) {
            setError('Gagal mengubah urutan.');
            // Jika gagal, kembalikan ke state semula
            fetchCarouselItems(); 
        }
    };



    if (loading && carouselItems.length === 0) {
        return <div className="text-center p-8">Loading data...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    const isUploadDisabled = carouselItems.length >= MAX_ITEMS || loading;

    
    return (
        <div>
            {/* Note Box */}
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mb-8 flex items-start gap-4">
                <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" size={20}/>
                <div>
                    <p className="font-bold">Informasi Penting</p>
                    <ul className="list-disc list-inside text-sm mt-2">
                        <li>Upload Foto dengan dimensi ideal **1200x800 pixel**.</li>
                        <li>Gunakan foto resolusi tinggi untuk hasil terbaik.</li>
                        <li>Konten carousel maksimal berjumlah 4 buah.</li>
                    </ul>
                </div>
            </div>

            {/* Daftar Konten */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Daftar Konten Hero</h3>
                <div className="space-y-4">
                    {carouselItems.map(item => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-3 rounded-md even:bg-gray-50">
                            <img src={`http://localhost:4000/${item.image_url}`} alt={item.alt_text} className="w-24 h-16 object-cover rounded-md bg-gray-200" />
                            <span className="font-semibold text-gray-600">{item.alt_text || `Carousel Item #${item.id}`}</span>
                            <span>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {item.is_published ? 'Published' : 'Draft'}
                                </span>
                            </span>
                            <div className="flex items-center gap-2">
                                <select 
                                    value={item.sort_order} 
                                    onChange={(e) => handleSortOrderChange(item.id, parseInt(e.target.value))}
                                    className="p-2 border border-gray-300 rounded-md"
                                    title="Ubah Urutan"
                                >
                                    {Array.from({ length: carouselItems.length }, (_, i) => i + 1).map(order => (
                                        <option key={order} value={order}>{order}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash /></button>
                                <button onClick={() => handleEditClick(item)} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen /></button>
                            </div>
                        </div>
                    ))}
                    {carouselItems.length === 0 && <p className="text-gray-500 text-center py-4">Belum ada konten carousel.</p>}
                </div>
            </div>

            {/* Bagian Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Upload Foto Baru</h3>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                {carouselItems.length >= MAX_ITEMS && (
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md mb-6">
                        <p className="font-bold">Slot Penuh</p>
                        <p>Anda sudah mencapai batas maksimal ({MAX_ITEMS}) item carousel. Hapus salah satu item untuk menambah yang baru.</p>
                    </div>
                )}
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg p-1" />
                        ) : (
                            <span className="text-gray-400">Image Preview</span>
                        )}
                    </div>
                    <div className="space-y-4">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        <button onClick={handleUpload} disabled={loading || carouselItems.length >= MAX_ITEMS} className="w-full flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed">
                            <FaUpload />
                            <span>{loading ? 'Processing...' : 'Upload Konten'}</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <CarouselEditModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={editingItem}
                onSave={handleUpdate}
            />
        </div>
    );
};

export default HomePageManagement;