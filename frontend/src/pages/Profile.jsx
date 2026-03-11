import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberById, updateMemberDetails } from "../redux/Slices/membersSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { selectedMember, loading, error } = useSelector((state) => state.members);
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const storedUser = user?.user?.id;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
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
                gender: selectedMember.gender || "",
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
        <div className="min-h-screen bg-[var(--cream)] p-10 flex flex-col items-center gap-12">

            {/* Profile Card */}
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border border-[var(--beige)] hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-[var(--brown-dark)]">
                    Profile Details
                </h2>

                {loading && <p className="text-center text-[var(--brown-dark)]">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {selectedMember && (
                    <div className="space-y-5 text-[var(--brown-dark)]">
                        <div className="flex justify-between border-b border-[var(--beige)] pb-2">
                            <span className="font-semibold">Name</span>
                            <span>{selectedMember.name}</span>
                        </div>

                        <div className="flex justify-between border-b border-[var(--beige)] pb-2">
                            <span className="font-semibold">Email</span>
                            <span>{selectedMember.email}</span>
                        </div>

                        <div className="flex justify-between border-b border-[var(--beige)] pb-2">
                            <span className="font-semibold">Phone</span>
                            <span>{selectedMember.phone || "Not provided"}</span>
                        </div>

                        <div className="flex justify-between items-center border-b border-[var(--beige)] pb-2">
                            <span className="font-semibold">Role</span>
                            <span className={`capitalize px-3 py-1 rounded-full text-white ${
                                selectedMember.role === "admin" ? "bg-[var(--brown-dark)]" : "bg-[var(--brown-medium)]"
                            }`}>
                                {selectedMember.role}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Gender</span>
                            <span className="capitalize px-3 py-1 rounded-full bg-[var(--brown-light)] text-[var(--brown-dark)]">
                                {selectedMember.gender || "Not set"}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Update Form */}
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border border-[var(--beige)] hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-[var(--brown-dark)]">
                    Update Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {["name", "email", "phone"].map((field) => (
                        <div key={field}>
                            <label className="block text-[var(--brown-dark)] mb-1 font-medium capitalize">
                                {field}
                            </label>

                            
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full border border-[var(--beige)] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)] transition-all duration-200"
                                />
                            
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-[var(--brown-medium)] text-white py-3 rounded-xl hover:bg-[var(--brown-dark)] font-semibold transition-all duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;