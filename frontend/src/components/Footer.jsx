import React from "react";
import {
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
} from "lucide-react";

const Footer = () => {

    const handleLanguageChange = () => {
        // i18n.changeLanguage(selectedLang);
    };

    return (
        <footer className="bg-[var(--brown-dark)] text-[var(--cream)] border-t border-[var(--beige)] py-10 px-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-sm">

                {/* Left: Brand & Social */}
                <div className="flex flex-col items-start space-y-4">

                    <h2 className="text-xl font-bold tracking-wide">
                        Team Neighbours
                    </h2>

                    <p className="text-[var(--cream)]/80">
                        Unveil Team Work
                    </p>

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

                {/* Middle: Newsletter */}
                <div className="flex flex-col space-y-4">

                    <h3 className="font-semibold text-[var(--cream)]">
                        Join our Team
                    </h3>

                    <p className="text-[var(--cream)]/80">
                        Grow with us.
                    </p>

                    <form className="flex w-full max-w-sm">

                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="flex-1 p-2 rounded-l-lg border border-[var(--beige)] focus:outline-none focus:ring-1 focus:ring-[var(--gold-accent)] text-black"
                        />

                        <button
                            type="submit"
                            className="bg-[var(--gold-accent)] text-black px-4 py-2 rounded-r-lg hover:opacity-90 transition"
                        >
                            Subscribe
                        </button>

                    </form>
                </div>

                {/* Right: Settings */}
                <div className="flex flex-col space-y-4">

                    <h3 className="font-semibold text-[var(--cream)]">
                        Settings
                    </h3>

                    <label className="flex flex-col">

                        <span className="mb-1 text-[var(--cream)]/80">
                            Language
                        </span>

                        <select
                            className="p-2 border border-[var(--beige)] rounded text-black"
                            onChange={handleLanguageChange}
                        >
                            <option value='en'>English</option>
                            <option value='fr'>Français</option>
                            <option value='sw'>Swahili</option>
                            <option value='cn'>Chinese</option>
                            <option value='jp'>Japanese</option>
                            <option value='de'>German</option>
                            <option value='es'>Spanish</option>
                        </select>

                    </label>

                    <label className="flex flex-col">

                        <span className="mb-1 text-[var(--cream)]/80">
                            Currency
                        </span>

                        <select className="p-2 border border-[var(--beige)] rounded text-black">
                            <option>USD</option>
                            <option>KES</option>
                            <option>EUR</option>
                        </select>

                    </label>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="text-center text-xs mt-8 text-[var(--cream)]/70">
                &copy; {new Date().getFullYear()} Team Neighbours. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;