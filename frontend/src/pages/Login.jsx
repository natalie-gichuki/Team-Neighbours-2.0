import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(login(form));
            if (result.meta.requestStatus === 'fulfilled') {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                });
                navigate("/");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid credentials. Please try again.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'An error occurred. Please try again.',
            });
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E6CC] via-[#EAD2A8] to-[#D4A373] p-4">

                <div className="bg-[#F5E6CC] rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

                    {/* Left Section */}
                    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#5C4033] to-[#8B5E3C] items-center justify-center text-[#F5E6CC] text-center p-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Welcome Back 💬</h2>
                            <p className="text-lg opacity-90">
                                Log in and continue your journey towards financial empowerment with your chama.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[#F5E6CC]">

                        <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-6">
                            Sign In
                        </h2>

                        {error && (
                            <p className="text-[#8B5E3C] text-sm text-center mb-4">{error}</p>
                        )}

                        <form onSubmit={handleSubmit} autoComplete="off">

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm text-[#5C4033] mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="✉️ youremail@gmail.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-[#EAD2A8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                                    required
                                    autoComplete="new-email"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label className="block text-sm text-[#5C4033] mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="🔒 Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-[#EAD2A8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#D4A373] hover:bg-[#C48A5A] text-white font-medium py-3 rounded-xl transition duration-300 shadow-lg"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Login'}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="mt-6 text-center text-sm text-[#5C4033]">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-[#8B5E3C] font-medium hover:underline"
                            >
                                Register
                            </Link>
                        </div>

                        <p className="text-center text-xs text-[#5C4033]/60 mt-6">
                            © 2026 Vibrant Chama Network
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;