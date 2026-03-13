import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import {
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
} from "lucide-react";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        setMenuOpen(false);
    };

    const linkClass =
        "hover:text-[var(--gold-accent)] transition duration-300 font-medium";

    return (
        <nav className="bg-[var(--brown-dark)] text-[var(--cream)] shadow-xl relative">
            <div className="flex items-center justify-between px-6 py-4 relative">

                {/* Left: Logo */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-2xl font-extrabold tracking-wide hover:text-[var(--gold-accent)] transition"
                    >
                        Team Neighbours
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Center: Nav Links */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 text-lg">
                    <Link to="/" className={linkClass}>Home</Link>
                    {user?.role === "admin" && <Link to="/admin/contributions" className={linkClass}>Contributions</Link>}
                    {user?.role === "member" && <Link to="/my-contributions" className={linkClass}>My Contributions</Link>}
                    {user?.role === "admin" && <Link to="/admin/attendance" className={linkClass}>Attendance</Link>}
                    {user?.role === "member" && <Link to="/my-attendance" className={linkClass}>My Attendance</Link>}
                    {user?.role === "admin" && <Link to="/admin/fine" className={linkClass}>Fines</Link>}
                    {user?.role === "member" && <Link to="/my-fines" className={linkClass}>My Fines</Link>}
                    {user?.role === "admin" && <Link to="/admin/loan" className={linkClass}>Loans</Link>}
                    {user?.role === "member" && <Link to="/my-loans" className={linkClass}>My Loans</Link>}
                </div>

                {/* Right: Profile & Logout or Sign In / Sign Up */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="border-2 rounded-2xl text-[var(--brown-dark)] bg-white hover:text-[var(--gold-accent)] hover:scale-110 transition duration-300 font-medium px-3 py-1"
                            >
                                👤Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-800 border-2 border-black p-2 rounded-2xl hover:text-[var(--gold-accent)] transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={linkClass}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[var(--gold-accent)] text-black font-semibold px-5 py-2 rounded-full hover:opacity-90 transition shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/*MOBILE MENU*/}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-[var(--cream)] text-[var(--brown-dark)] overflow-y-auto">

                    <div className="flex flex-col min-h-screen p-6 gap-6">

                        {/* Menu Links with brown dividers */}
                        <div className="flex flex-col divide-y divide-[var(--brown-dark)] divide-opacity-30 text-lg font-medium">
                            <Link to="/" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>

                            {user?.role === "admin" && (
                                <Link to="/admin/contributions" className="hover:text-[var(--gold-accent)] transition duration-300 font-medium py-3" onClick={() => setMenuOpen(false)}>Contributions</Link>
                            )}

                            {user?.role === "member" && (
                                <Link to="/my-contributions" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>My Contributions</Link>
                            )}

                            {user?.role === "admin" && (
                                <Link to="/admin/attendance" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>Attendance</Link>
                            )}

                            {user?.role === "member" && (
                                <Link to="/my-attendance" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>My Attendance</Link>
                            )}

                            {user?.role === "admin" && (
                                <Link to="/admin/fine" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>Fines</Link>
                            )}

                            {user?.role === "member" && (
                                <Link to="/my-fines" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>My Fines</Link>
                            )}

                            {user?.role === "admin" && (
                                <Link to="/admin/loan" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>Loans</Link>
                            )}

                            {user?.role === "member" && (
                                <Link to="/my-loans" className="py-3 hover:text-[var(--gold-accent)] transition duration-300 font-medium" onClick={() => setMenuOpen(false)}>My Loans</Link>
                            )}
                        </div>

                        {/* Profile / Auth with top border */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-[var(--brown-dark)] divide-y divide-[var(--brown-dark)] divide-opacity-30">
                            {user ? (
                                <div className="flex flex-col gap-2 p-4">
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center justify-center w-32 border-2 rounded-2xl bg-white text-[var(--brown-dark)] hover:text-[var(--gold-accent)] font-medium px-4 py-2 transition duration-300 shadow-md"
                                    >
                                        👤 Profile
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center w-32 bg-red-800 text-white font-medium rounded-2xl px-4 py-2 hover:text-[var(--gold-accent)] transition duration-300 shadow-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-[var(--brown-medium)] text-white font-semibold rounded-full w-fit px-4 py-2 shadow-md">Sign In</Link>

                                    <Link
                                        to="/register"
                                        className="bg-[var(--gold-accent)] text-black font-semibold px-4 py-2 rounded-full w-fit"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Bottom Section: Socials */}
                        <div className="mt-auto pt-6 border-t border-[var(--brown-dark)] flex flex-col gap-4">
                            <div className="flex space-x-4">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-5 w-5 hover:text-[var(--gold-accent)] transition" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-5 w-5 hover:text-[var(--gold-accent)] transition" />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <Youtube className="h-5 w-5 hover:text-[var(--gold-accent)] transition" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-5 w-5 hover:text-[var(--gold-accent)] transition" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>


            )}
        </nav>
    );
};

export default Navbar;