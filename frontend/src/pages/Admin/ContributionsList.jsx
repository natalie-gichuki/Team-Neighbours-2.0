import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {
    fetchContributions,
    createContribution,
    updateContribution,
    deleteContribution
} from "../../redux/Slices/contributionsSlice";

import { FetchAllMembers } from "../../redux/Slices/membersSlice";

const ContributionList = () => {
    const dispatch = useDispatch();
    const { contributions, loading, error } = useSelector(
        (state) => state.contributions
    );

    const { members } = useSelector((state) => state.members);

    useEffect(() => {
        dispatch(FetchAllMembers());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        member_id: "",
        amount: "",
        date: ""
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchContributions());
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            dispatch(updateContribution({
                id: editId,
                contributionData: formData
            }));
            setEditId(null);
        } else {
            dispatch(createContribution(formData));
        }

        setFormData({
            member_id: "",
            amount: "",
            date: ""
        });
    };

    const handleEdit = (contribution) => {
        setEditId(contribution.id);
        setFormData({
            member_id: contribution.member_id,
            amount: contribution.amount,
            date: contribution.date
                ? new Date(contribution.date).toISOString().split("T")[0]
                : ""

        });
    };

    const handleDelete = (id) => {
        dispatch(deleteContribution(id));
    };

    // Summarize contributions by date
    const contributionsByDate = contributions.reduce((acc, curr) => {
        if (!curr.date) return acc; // skip if date is missing

        const dateObj = new Date(curr.date);
        if (isNaN(dateObj.getTime())) return acc; // skip if invalid date

        const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
        if (!acc[date]) acc[date] = 0;
        acc[date] += parseFloat(curr.amount) || 0; // ensure amount is a number
        return acc;
    }, {});
    // Prepare data for the chart
    const chartData = Object.entries(contributionsByDate).map(([date, total]) => ({
        date,
        total
    }));

    // Calculate total contributions overall
    const totalContributions = Object.values(contributionsByDate).reduce(
        (sum, value) => sum + value,
        0
    );

    const getMemberName = (id) => {
        const member = members.find((m) => m.id === id);
        return member ? member.name : id; // fallback to ID if name not found
    };

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                Admin Contributions Management
            </h2>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            >
                <select
                    name="member_id"
                    value={formData.member_id}
                    onChange={handleChange}
                    required
                    className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                >
                    <option value="">Select Member</option>
                    {(members || []).map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                />
                <button
                    type="submit"
                    className={`px-6 py-2 rounded-xl font-semibold shadow-md transition ${editId
                        ? "bg-[var(--gold-accent)] text-black hover:opacity-90"
                        : "bg-[var(--brown-medium)] text-white hover:opacity-90"
                        }`}
                >
                    {editId ? "Update Contribution" : "Create Contribution"}
                </button>
            </form>

            {/* STATUS */}
            {loading && <p className="text-[var(--brown-dark)] mb-4">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead>
                        <tr className="bg-[var(--brown-medium)] text-white">
                            <th className="p-3 text-left">Member</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(contributions || []).filter(c => c.id).map((contribution) => (
                            <tr
                                key={contribution.id}
                                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                            >
                                <td className="p-3">{getMemberName(contribution.member_id)}</td>
                                <td className="p-3">{contribution.amount}</td>
                                <td className="p-3">{new Date(contribution.date).toLocaleDateString()}</td>
                                <td className="p-3 flex justify-end gap-2">
                                    <button
                                        onClick={() => handleEdit(contribution)}
                                        className="bg-[var(--brown-dark)] text-[var(--cream)] px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contribution.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Total Contributions per Date</h3>
                <p className="mb-4 text-lg font-semibold">Overall Total: KSh {totalContributions.toLocaleString()}</p>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => `KSh ${value}`} />
                        <Bar dataKey="total" fill="#8B5E3C" /> {/* brown-dark color */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ContributionList;