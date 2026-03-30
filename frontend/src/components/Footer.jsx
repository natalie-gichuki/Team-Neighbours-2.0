import React from "react";
import { useSelector } from "react-redux";
import {
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

    const handleLanguageChange = () => {
        // i18n.changeLanguage(selectedLang);
    };
    const { user } = useSelector((state) => state.auth);

    return (
        <footer className="bg-gradient-to-r from-[var(--brown-dark)] via-[var(--brown-medium)] to-[var(--brown-dark)] text-[var(--cream)]">

            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Umoja Capital Track
                    </h2>

                    <p className="text-[var(--cream)]/80 leading-relaxed">
                        Empowering communities to grow wealth together through
                        transparent contributions, loans, fines and attendance
                        management.
                    </p>
                </div>


                {/* Navigation Links */}
                <div>

                    <h3 className="text-lg font-semibold mb-4">
                        Navigation
                    </h3>

                    <div className="flex flex-col space-y-2 text-[var(--cream)]/90">

                        <Link to="/" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                            Home
                        </Link>

                        {user?.role === "admin" && (
                            <Link to="/admin/contributions" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                Contributions
                            </Link>
                        )}

                        {user?.role === "member" && (
                            <Link to="/my-contributions" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                My Contributions
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/admin/attendance" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                Attendance
                            </Link>
                        )}

                        {user?.role === "member" && (
                            <Link to="/my-attendance" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                My Attendance
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/admin/fine" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                Fines
                            </Link>
                        )}

                        {user?.role === "member" && (
                            <Link to="/my-fines" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                My Fines
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/admin/loan" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                Loans
                            </Link>
                        )}

                        {user?.role === "member" && (
                            <Link to="/my-loans" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                My Loans
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link to="/admin/members" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                Members
                            </Link>
                        )}

                        {!user && (
                            <>
                                <Link to="/login" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                    Sign In
                                </Link>

                                <Link to="/register" className="hover:text-[var(--gold-accent)] transition hover:translate-x-1">
                                    Register
                                </Link>
                            </>
                        )}

                    </div>

                </div>


                {/* Contact / Info */}
                <div>

                    <h3 className="text-lg font-semibold mb-4">
                        Contact
                    </h3>

                    <div className="space-y-2 text-[var(--cream)]/80">

                        <p>Email: support@umojacapitaltrack.com</p>

                        <p>Phone: +254 700 000 000</p>

                        <p>Nairobi, Kenya</p>

                    </div>

                    {/* Footer Links */}
                    <div className="flex mt-10 text-md gap-6">

                        <Link
                            to="/terms"
                            className="hover:underline hover:text-[var(--gold-accent)] transition"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            to="/privacy-policy"
                            className="hover:underline hover:text-[var(--gold-accent)] transition"
                        >
                            Privacy Policy
                        </Link>

                    </div>

                </div>

            </div>


            {/* Bottom Footer */}
            <div className="border-t border-[var(--brown-medium)]/40 py-4 flex flex-col items-center gap-2 text-[var(--cream)]/70 text-sm">

                <p className="text-center">
                    © {new Date().getFullYear()} Umoja Capital Track. All rights reserved.
                </p>



            </div>

        </footer>
    );
};

export default Footer;