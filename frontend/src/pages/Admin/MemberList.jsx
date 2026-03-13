import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchAllMembers,
    fetchDisabledMembers,
    disableMember,
    enableMember
} from "../../redux/Slices/membersSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const MemberList = () => {
    const dispatch = useDispatch();
    const { members, disabledMembers, loading, error } = useSelector(
        (state) => state.members
    );

    useEffect(() => {
        dispatch(FetchAllMembers());
        dispatch(fetchDisabledMembers());
    }, [dispatch]);

     const handleDisable = (id) => {
            Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7a4b2a",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, disable!"
            }).then((result) => {
                if (result.isConfirmed) {
    
                    dispatch(disableMember(id))
                        .unwrap()
                        .then(() => {
                            Swal.fire("Disabled!", "The member has been disabled.", "success");
                        })
                        .catch(() => {
                            Swal.fire("Error!", "Something went wrong.", "error");
                        });
    
                }
            });
        };

    const handleEnable = (id) => {
        dispatch(enableMember(id))
            .unwrap()
            .then(() => {
                toast.success("Member enabled successfully!");
            })
            .catch(() => {
                toast.error("Failed to enable member.");
            });
    };

    // Calculate summary totals
    const totalRegistered = (members?.length || 0) + (disabledMembers?.length || 0);
    const totalActive = members?.length || 0;
    const totalDisabled = disabledMembers?.length || 0;

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                Admin Member Management
            </h1>

            {/* Member summary cards */}
            <div className="flex flex-wrap gap-6 mb-8">
                {/* Total Registered */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--brown-dark)] to-[var(--brown-medium)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">
                        📋
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Total Registered</h3>
                        <p className="text-3xl font-bold">{totalRegistered}</p>
                        <span className="text-sm opacity-70">All members in the system</span>
                    </div>
                </div>

                {/* Active Members */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--gold-accent)] to-[var(--brown-medium)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">
                        ✅
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Active Members</h3>
                        <p className="text-3xl font-bold">{totalActive}</p>
                        <span className="text-sm opacity-70">Members currently enabled</span>
                    </div>
                </div>

                {/* Disabled Members */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--brown-medium)] to-[var(--cream)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">
                        ⛔
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Disabled Members</h3>
                        <p className="text-3xl font-bold">{totalDisabled}</p>
                        <span className="text-sm opacity-70">Members currently disabled</span>
                    </div>
                </div>
            </div>

            {loading && <p className="mb-4 text-[var(--brown-dark)]">Loading...</p>}
            {error && <p className="mb-4 text-red-500">{error}</p>}

            {/* Active Members Table */}
            <h2 className="text-2xl font-semibold mb-4">Active Members</h2>
            <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-[var(--beige)] border-collapse text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3 w-1/4">Name</th>
                            <th className="p-3 w-1/4">Email</th>
                            <th className="p-3 w-1/4">Role</th>
                            <th className="p-3 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(members || []).map((member) => (
                            <tr
                                key={member.id}
                                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                            >
                                <td className="p-3">{member.name}</td>
                                <td className="p-3">{member.email}</td>
                                <td className="p-3 capitalize">{member.role}</td>
                                <td className="p-3">
                                    {member.role !== "admin" && (
                                        <button
                                            onClick={() => handleDisable(member.id)}
                                            className="bg-red-900 text-white px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                        >
                                            Disable
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Disabled Members Table */}
            <h2 className="text-2xl font-semibold mb-4">Disabled Members</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-[var(--beige)] border-collapse text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3 w-1/4">Name</th>
                            <th className="p-3 w-1/4">Email</th>
                            <th className="p-3 w-1/4">Role</th>
                            <th className="p-3 w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(disabledMembers || []).map((member) => (
                            <tr
                                key={member.id}
                                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                            >
                                <td className="p-3">{member.name}</td>
                                <td className="p-3">{member.email}</td>
                                <td className="p-3">{member.role}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleEnable(member.id)}
                                        className="bg-green-900 text-white px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                    >
                                        Enable
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Toastify Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default MemberList;