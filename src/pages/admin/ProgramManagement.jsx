import React, { useState } from 'react';
import { FaUpload, FaTrash, FaPen, FaGraduationCap, FaGlobe } from 'react-icons/fa';

const ProgramManagement = () => {
    const [iconPreview, setIconPreview] = useState(null);

    // Data dummy sesuai skema Program Anda
    const [programs, setPrograms] = useState([
        {
            id: 1,
            title: "Educational Program",
            subtitle: "Language Program",
            description: "Program intensif untuk meningkatkan kemahiran berbahasa asing sebagai bekal utama diplomasi budaya.",
            icon_url: 'FaGraduationCap', // Kita gunakan nama ikon sebagai placeholder
            sort_order: 1,
            is_published: true,
        },
        {
            id: 2,
            title: "Cultural Exchange Program",
            subtitle: "",
            description: "Kesempatan untuk hidup dan belajar di negara lain, memperluas wawasan dan membangun jaringan internasional.",
            icon_url: 'FaGlobe', // Kita gunakan nama ikon sebagai placeholder
            sort_order: 2,
            is_published: true,
        },
    ]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIconPreview(URL.createObjectURL(file));
        }
    };
    
    // Fungsi untuk menampilkan ikon berdasarkan nama
    const renderIcon = (iconName) => {
        if (iconName === 'FaGraduationCap') return <FaGraduationCap className="text-brand-pink" size={24} />;
        if (iconName === 'FaGlobe') return <FaGlobe className="text-brand-pink" size={24} />;
        return null;
    };

    return (
        <div className="space-y-8">
            {/* Form Input */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">Tambah / Edit Program</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="program-title" className="block text-sm font-medium text-gray-600 mb-1">Judul Program</label>
                            <input type="text" id="program-title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                        <div>
                            <label htmlFor="program-subtitle" className="block text-sm font-medium text-gray-600 mb-1">Subtitle (Opsional)</label>
                            <input type="text" id="program-subtitle" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="program-description" className="block text-sm font-medium text-gray-600 mb-1">Deskripsi</label>
                        <textarea id="program-description" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Ikon Program</label>
                             <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                {iconPreview ? <img src={iconPreview} alt="Preview" className="w-16 h-16 object-contain" /> : <span className="text-gray-400">Icon Preview</span>}
                            </div>
                            <input type="file" accept="image/*,.svg" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100" />
                        </div>
                         <div>
                            <label htmlFor="program-sort-order" className="block text-sm font-medium text-gray-600 mb-1">Urutan</label>
                            <input type="number" id="program-sort-order" defaultValue="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="program-is-published" className="h-4 w-4 rounded border-gray-300 text-brand-purple focus:ring-brand-purple" defaultChecked />
                            <label htmlFor="program-is-published" className="text-sm font-medium text-gray-700">Publikasikan</label>
                        </div>
                        <button type="submit" className="flex items-center justify-center gap-2 bg-brand-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition-colors">
                            <FaUpload />
                            <span>Simpan Program</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Program */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-4">Daftar Program</h3>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {programs.map(program => (
                        <div key={program.id} className="flex items-start gap-4 p-3 rounded-md border border-gray-200">
                           <div className="w-12 h-12 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center">
                                {renderIcon(program.icon_url)}
                           </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{program.title}</h4>
                                <p className="text-sm font-semibold text-gray-600">{program.subtitle}</p>
                                <p className="text-sm text-gray-500 mt-1">{program.description.substring(0,100)}...</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${program.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                                    {program.is_published ? 'Published' : 'Draft'}
                                </span>
                                <button className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors" title="Perbarui"><FaPen size={14} /></button>
                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" title="Hapus"><FaTrash size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgramManagement;