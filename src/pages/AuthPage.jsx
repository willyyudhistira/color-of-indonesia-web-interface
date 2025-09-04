import React, { useState } from 'react';
import MainPattern from '../assets/pattern.png';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../hooks/AuthContext';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setFormData] = useState({ name: '',    email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, token, loading: authLoading } = useAuth();

    // Otorisasi: Jika sudah login, jangan tampilkan halaman ini
    if (!authLoading && token) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // Mencegah form refresh halaman
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                const response = await register(formData.name, formData.email, formData.password);
                alert(response.message || 'Akun berhasil dibuat! Silakan login.');
                setIsLogin(true); // Arahkan ke form login
                setFormData({ name: '', email: '', password: '' }); // Kosongkan form
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <div className="min-h-screen w-full relative bg-slate-100">
            <div 
                className="absolute inset-0 opacity-30"
                style={{ 
                    backgroundImage: `url(${MainPattern})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            ></div>

            <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        {/* <Link to="/">
                            <img src={Logo} alt="Color Of Indonesia Logo" className="h-20 mx-auto" />
                        </Link> */}
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
                        <h2 className="text-3xl font-bold text-brand-purple text-center mb-6">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div>
                                    <label htmlFor="name" className="sr-only">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        placeholder="Full Name" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Email Address" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="password" 
                                    placeholder="Password" 
                                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} 
                                </button>
                            </div>
                            
                            {error && (
                                <p className="text-center text-red-500 text-sm font-medium">{error}</p>
                            )}

                            <button type="submit" className="w-full bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-purple-400" disabled={isLoading}>
                                {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                            </button>
                        </form>

                        <p className="text-center text-gray-600 text-sm mt-6">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="font-bold text-brand-pink hover:underline ml-1"
                            >
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;