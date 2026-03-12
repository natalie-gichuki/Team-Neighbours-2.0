import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberById, updateMemberDetails } from "../redux/Slices/membersSlice";
import { Link } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const { selectedMember, loading, error } = useSelector((state) => state.members);

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const storedUser = user?.user?.id;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (!storedUser) return;
        dispatch(fetchMemberById(storedUser));
    }, [dispatch, storedUser]);

    useEffect(() => {
        if (selectedMember) {
            setFormData({
                name: selectedMember.name || "",
                email: selectedMember.email || "",
                phone: selectedMember.phone || "",
            });
        }
    }, [selectedMember]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateMemberDetails({
                id: storedUser,
                memberData: formData,
            })
        );
    };

    return (

        <div className="min-h-screen bg-[var(--cream)] p-10">

            {/* HEADER */}
            <h1 className="text-4xl font-bold text-[var(--brown-dark)] mb-10 text-center">
                My Profile
            </h1>
           

                {/* TOP PROFILE SECTION */}
                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                    {/* PROFILE CARD */}
                    <div className="bg-white shadow-xl p-8 border border-[var(--brown-dark)]  flex flex-col items-center text-center">

                        <div className="border-2 border-[var(--brown-medium)]  w-32 h-32 rounded-full bg-[var(--brown-light)] flex items-center justify-center text-4xl font-bold text-[var(--brown-dark)] mb-4">
                            {selectedMember?.name?.charAt(0)}
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--brown-dark)]">
                            {selectedMember?.name}
                        </h2>

                        <p className="text-[var(--brown-medium)]">{selectedMember?.email}</p>

                        <div className="mt-4">
                            <span className="px-4 py-1 rounded-full bg-[var(--brown-medium)] text-white capitalize">
                                {selectedMember?.role}
                            </span>
                        </div>

                        {/* NAVIGATION */}
                        <div className="flex gap-4 mt-6">
                            <Link
                                to="/my-attendance"
                                className="px-4 py-2 bg-[var(--brown-medium)] text-white rounded-lg hover:bg-[var(--brown-dark)]"
                            >
                                My Attendance
                            </Link>

                            <Link
                                to="/my-contributions"
                                className="px-4 py-2 border border-[var(--brown-medium)] text-[var(--brown-dark)] rounded-lg hover:bg-[var(--brown-light)]"
                            >
                                My Contributions
                            </Link>
                        </div>
                    </div>

                    {/* BIO DETAILS CARD */}
                    <div className="bg-white shadow-xl p-8 border border-[var(--brown-dark)] ">

                        <h2 className="text-2xl font-bold mb-6 text-[var(--brown-dark)]">
                            Bio & Details
                        </h2>

                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {selectedMember && (
                            <div className="space-y-4">

                                <div className="flex justify-between border-b pb-2 border-[var(--beige)]">
                                    <span className="font-semibold">Name</span>
                                    <span>{selectedMember.name}</span>
                                </div>

                                <div className="flex justify-between border-b pb-2 border-[var(--beige)]">
                                    <span className="font-semibold">Email</span>
                                    <span>{selectedMember.email}</span>
                                </div>

                                <div className="flex justify-between border-b pb-2 border-[var(--beige)]">
                                    <span className="font-semibold">Phone</span>
                                    <span>{selectedMember.phone || "Not provided"}</span>
                                </div>

                                <div className="flex justify-between border-b pb-2 border-[var(--beige)]">
                                    <span className="font-semibold">Gender</span>
                                    <span>{selectedMember.gender || "Not set"}</span>
                                </div>

                            </div>
                        )}
                    </div>
                </div>

                {/* UPDATE PROFILE */}
                <div className="bg-white shadow-xl p-8 max-w-2xl mx-auto mt-12 border border-[var(--brown-dark)] ">

                    <h2 className="text-2xl font-bold mb-6 text-[var(--brown-dark)] text-center">
                        Update Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {["name", "email", "phone"].map((field) => (
                            <div key={field}>
                                <label className="block mb-1 font-medium capitalize text-[var(--brown-dark)]">
                                    {field}
                                </label>

                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full border border-[var(--beige)] rounded-xl p-3 focus:ring-2 focus:ring-[var(--brown-medium)] outline-none"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full bg-[var(--brown-medium)] text-white py-3 rounded-xl hover:bg-[var(--brown-dark)] font-semibold"
                        >
                            Update Profile
                        </button>

                    </form>
                </div>
        </div>
    );
};

export default Profile;