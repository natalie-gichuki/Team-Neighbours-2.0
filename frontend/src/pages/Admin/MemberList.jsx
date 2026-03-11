import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchAllMembers,
    fetchDisabledMembers,
    disableMember,
    enableMember
} from "../../redux/Slices/membersSlice";

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
        dispatch(disableMember(id));
    };

    const handleEnable = (id) => {
        dispatch(enableMember(id));
    };

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                Admin Member Management
            </h1>

            {loading && <p className="mb-4 text-[var(--brown-dark)]">Loading...</p>}
            {error && <p className="mb-4 text-red-500">{error}</p>}

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
        </div>
    );
};

export default MemberList;