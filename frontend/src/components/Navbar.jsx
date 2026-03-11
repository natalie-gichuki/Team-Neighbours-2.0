import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slices/authSlice";

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
        <nav className="bg-[var(--brown-dark)] text-[var(--cream)] shadow-xl">
            <div className="flex justify-between items-center px-6 py-4">

                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-2xl font-extrabold tracking-wide hover:text-[var(--gold-accent)] transition"
                    >
                        Team Neighbours
                    </Link>

                    <button
                        className="md:hidden text-3xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-lg">

                    <Link to="/" className={linkClass}>
                        Home
                    </Link>

                    {user?.role === "admin" && (
                        <Link to="/admin/members" className={linkClass}>
                            Members
                        </Link>
                    )}

                    {/* Admin contributions */}
                    {user?.role === "admin" && (
                        <Link to="/admin/contributions" className={linkClass}>
                            Contributions
                        </Link>
                    )}

                    {/* Member contributions */}
                    {user?.role === "member" && (
                        <Link to="/my-contributions" className={linkClass}>
                            My Contributions
                        </Link>
                    )}

                    {user ? (
                        <>
                            <span className="text-sm italic opacity-90">
                                {user.name}
                            </span>

                            <Link to="/profile" className={linkClass}>
                                👤
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="hover:text-[var(--gold-accent)] transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={linkClass}>
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

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[var(--cream)] text-[var(--brown-dark)] shadow-lg">
                    <div className="flex flex-col gap-5 p-6">

                        <Link to="/" className={linkClass}>
                            Home
                        </Link>

                        {user?.role === "admin" && (
                            <Link to="/admin/members" className={linkClass}>
                                Members
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/admin/contributions" className={linkClass}>
                                Contributions
                            </Link>
                        )}

                        {user?.role === "member" && (
                            <Link to="/my-contributions" className={linkClass}>
                                My Contributions
                            </Link>
                        )}

                        {user ? (
                            <>
                                <span className="text-sm italic opacity-90">
                                    {user.name}
                                </span>

                                <Link to="/profile" className={linkClass}>
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="text-left hover:text-[var(--gold-accent)] transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={linkClass}>
                                    Sign In
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-[var(--gold-accent)] text-black font-semibold px-4 py-2 rounded-full hover:opacity-90 transition shadow-md w-fit"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;