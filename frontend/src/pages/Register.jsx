import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/Slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        gender: '',
        role: 'member',
    });

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match',
            });
            return;
        }

        try {
            const result = await dispatch(register(form));

            if (result.meta.requestStatus === 'fulfilled') {

                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                    role: 'member',
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your account has been created. Please log in.',
                });

                navigate("/login");
            }

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message || 'An error occurred. Please try again.',
            });

        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--cream)] p-4">

            <div className="bg-[var(--cream)] rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">

                {/* Left Side */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[var(--brown-dark)] to-[var(--brown-medium)] items-center justify-center text-[var(--cream)] text-center p-8">

                    <div>
                        <h2 className="text-4xl font-bold mb-4">Vibrant Chama Energy ✨</h2>
                        <p className="text-lg opacity-90">
                            Join the network of young, driven changemakers shaping financial freedom together.
                        </p>
                    </div>

                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[var(--cream)]">

                    <h2 className="text-3xl font-bold text-center text-[var(--brown-dark)] mb-6">
                        Create Your Account
                    </h2>

                    {error && (
                        <p className="text-[var(--brown-medium)] text-sm text-center mb-4">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} autoComplete="off">

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="👤 Your full name"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="new-name"
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div className="mb-4">
                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                            >
                                <option value="">-- Select Gender --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="✉️ youremail@gmail.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="new-email"
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                placeholder="📞 254*********"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6 relative">
                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="🔒 Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                        <div className="mb-6 relative">

                            <label className="block text-sm text-[var(--brown-dark)] mb-1">
                                Confirm Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="🔒 Confirm password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-[var(--beige)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold-accent)] bg-white"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-9 text-sm text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                        <label className="flex items-center gap-2 text-sm mt-4">
                            <input type="checkbox" required />

                            I agree to the
                            <a href="/terms" className="text-[var(--brown-medium)] underline ml-1">
                                Terms
                            </a>
                            and
                            <a href="/privacy-policy" className="text-[var(--brown-medium)] underline ml-1">
                                Privacy Policy
                            </a>
                        </label>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-[var(--gold-accent)] hover:opacity-90 text-white font-medium py-3 rounded-xl transition shadow-lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[var(--brown-dark)]">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[var(--brown-medium)] font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;