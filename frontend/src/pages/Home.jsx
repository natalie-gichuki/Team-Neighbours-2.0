import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="font-sans text-gray-800">

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#8B6B56] via-[#B58B6F] to-[#D4A373] p-8">

                <h1 className="text-5xl md:text-6xl font-bold text-[var(--cream)] mb-6 drop-shadow-lg">
                    Welcome to Team Neighbours Group
                </h1>

                <p className="text-lg md:text-xl text-[var(--cream)]/90 max-w-xl mb-8">
                    Join our community of changemakers and grow your wealth together.
                    Manage contributions, loans, fines, meeting attendance and savings effortlessly.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">

                    <Link
                        to="/register"
                        className="bg-[var(--brown-medium)] text-white px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="bg-white text-[var(--brown-medium)] px-6 py-3 rounded-xl shadow-md hover:bg-[var(--cream)] transition"
                    >
                        Sign In
                    </Link>

                </div>
            </section>

            {/* Logged in quick actions */}
            {user && (
                <section className="py-16 px-6 text-center">

                    <h2 className="text-3xl font-bold mb-8">
                        Welcome back, {user.name}
                    </h2>

                    <div className="flex justify-center gap-6 flex-wrap">

                        <Link
                            to="/profile"
                            className="bg-[var(--brown-dark)] text-[var(--cream)] px-6 py-3 rounded-full hover:opacity-90 transition"
                        >
                            View Profile
                        </Link>

                        {user.role === "admin" && (
                            <Link
                                to="/admin/contributions"
                                className="bg-[var(--gold-accent)] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
                            >
                                Manage Contributions
                            </Link>
                        )}

                        {user.role === "member" && (
                            <Link
                                to="/my-contributions"
                                className="bg-[var(--gold-accent)] text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
                            >
                                View My Contributions
                            </Link>
                        )}

                    </div>

                </section>
            )}


            {/* Features Section */}
            <section className="py-20 px-6 md:px-20 bg-[var(--cream)]">

                <h2 className="text-4xl font-bold text-center mb-12 text-[var(--brown-dark)]">
                    Available Features
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    {[
                        {
                            title: "Track Contributions",
                            desc: "Keep track of all member contributions in one place."
                        },
                        {
                            title: "Manage Loans",
                            desc: "Issue loans and monitor repayments easily."
                        },
                        {
                            title: "Manage Fines",
                            desc: "Set and track fines for members."
                        },
                        {
                            title: "Community Growth",
                            desc: "Collaborate and build wealth together."
                        },
                        {
                            title: "Meeting Attendance",
                            desc: "Track member attendance and participation."
                        },
                        {
                            title: "Savings Management",
                            desc: "Monitor savings goals and milestones."
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[var(--beige)] rounded-2xl p-8 shadow-md hover:shadow-xl transition"
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-[var(--brown-dark)]">
                                {feature.title}
                            </h3>

                            <p className="text-gray-700">
                                {feature.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-20 bg-[var(--brown-dark)] text-[var(--cream)] text-center">

                <h2 className="text-4xl font-bold mb-6">
                    Ready to grow with your Chama?
                </h2>

                <p className="mb-8 text-lg md:text-xl opacity-90">
                    Join our members already benefiting from our platform.
                </p>

                <Link
                    to="/register"
                    className="bg-[var(--gold-accent)] text-black px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
                >
                    Create Your Account
                </Link>

            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 md:px-20 bg-[var(--cream)]">

                <h2 className="text-4xl font-bold text-center mb-12 text-[var(--brown-dark)]">
                    What Our Members Say
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    <div className="bg-white border border-[var(--beige)] rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                        <p className="italic mb-4 text-gray-700">
                            "Team Neighbours helped me save consistently and access loans easily."
                        </p>
                        <span className="font-semibold text-[var(--brown-medium)]">
                            ~ Jasmine W.
                        </span>
                    </div>

                    <div className="bg-white border border-[var(--beige)] rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                        <p className="italic mb-4 text-gray-700">
                            "Tracking contributions has never been easier."
                        </p>
                        <span className="font-semibold text-[var(--brown-medium)]">
                            ~ John N.
                        </span>
                    </div>

                    <div className="bg-white border border-[var(--beige)] rounded-2xl p-8 shadow-md hover:shadow-lg transition">
                        <p className="italic mb-4 text-gray-700">
                            "The best Chama management platform I have used."
                        </p>
                        <span className="font-semibold text-[var(--brown-medium)]">
                            ~ Pricilla W.
                        </span>
                    </div>

                </div>
            </section>


        </div>
    );
};

export default Home;