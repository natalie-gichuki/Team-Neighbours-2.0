import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllFines,
    createFine,
    updateFine,
    deleteFine
} from "../../redux/Slices/fineSlice";

import { FetchAllMembers } from "../../redux/Slices/membersSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const FineList = () => {
    const dispatch = useDispatch();
    const { fines, loading } = useSelector((state) => state.fine);

    const { members } = useSelector((state) => state.members);

    const formRef = useRef(null);

    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        member_id: "",
        amount: "",
        date: "",
        status: "pending"
    });

    useEffect(() => {
        dispatch(fetchAllFines());
        dispatch(FetchAllMembers());
    }, [dispatch]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            dispatch(updateFine({ id: editingId, finedata: form }))
                .unwrap()
                .then(() => {
                    toast.success("Fine updated successfully!");
                    setEditingId(null);
                })
                .catch(() => {
                    toast.error("Failed to update fine.");
                });
        } else {
            dispatch(createFine(form))
                .unwrap()
                .then(() => {
                    toast.success("Fine created successfully!");
                })
                .catch(() => {
                    toast.error("Failed to create fine.");
                });
        }

        setForm({
            member_id: "",
            amount: "",
            date: "",
            status: "pending"
        });
    };
    const handleEdit = (fine) => {
        if (fine.status === "paid") return;
        setEditingId(fine.id);
        setForm({
            member_id: fine.member_id,
            amount: fine.amount,
            date: fine.date ? new Date(fine.date).toISOString().split("T")[0] : "",
            status: fine.status
        });

        toast.info("You are editing this fine record. Update the form.");

        // Scroll to the form smoothly
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7a4b2a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch(deleteFine(id))
                    .unwrap()
                    .then(() => {
                        Swal.fire("Deleted!", "The fine has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });

            }
        });
    };

    const pendingFines = fines?.filter(fine => fine.status === "pending") || [];
    const paidFines = fines?.filter(fine => fine.status === "paid") || [];

    if (loading) return <p className="p-6 text-[var(--brown-dark)]">Loading fines...</p>;

    const getMemberName = (id) => {
        const member = members.find((m) => m.id === id);
        return member ? member.name : id; // fallback to ID if name not found
    };

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">Fine Management</h1>

            {/* Fines Summary Cards */}
            <div className="flex flex-wrap gap-6 mb-8">
                {/* Total Fines */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--brown-dark)] to-[var(--brown-medium)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">💰</div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Total Fines</h3>
                        <p className="text-3xl font-bold">{fines?.length || 0}</p>
                        <span className="text-sm opacity-70">All fines in the system</span>
                    </div>
                </div>

                {/* Pending Fines */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--gold-accent)] to-[var(--brown-medium)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">⏳</div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Pending Fines</h3>
                        <p className="text-3xl font-bold">{pendingFines.length}</p>
                        <span className="text-sm opacity-70">Fines not yet paid</span>
                    </div>
                </div>

                {/* Paid Fines */}
                <div className="flex-1 min-w-[200px] bg-gradient-to-r from-[var(--brown-medium)] to-[var(--cream)] text-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                    <div className="text-5xl opacity-80">✅</div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">Paid Fines</h3>
                        <p className="text-3xl font-bold">{paidFines.length}</p>
                        <span className="text-sm opacity-70">Fines that are settled</span>
                    </div>
                </div>
            </div>

            <div ref={formRef}>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                >
                    <select
                        name="member_id"
                        value={form.member_id}
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
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                    />
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border border-[var(--beige)] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--brown-medium)]"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    </select>
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-xl font-semibold shadow-md transition col-span-1 md:col-span-4
            ${editingId ? "bg-[var(--gold-accent)] text-black hover:opacity-90" : "bg-[var(--brown-medium)] text-white hover:opacity-90"}`}
                    >
                        {editingId ? "Update Fine" : "Create Fine"}
                    </button>
                </form>
            </div>

            {/* PENDING FINES TABLE */}
            <div className="overflow-x-auto shadow-md mb-8 bg-white rounded-2xl p-4">
                <h2 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Pending Fines</h2>
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3">Member</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingFines.map(fine => (
                            <tr key={fine.id} className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]">
                                <td className="p-3">{getMemberName(fine.member_id)}</td>
                                <td className="p-3">{new Date(fine.date).toLocaleDateString()}</td>
                                <td className="p-3">{fine.amount}</td>
                                <td className="p-3 text-red-600 font-semibold">Pending</td>
                                <td className="p-3 text-right">
                                    <div className="inline-flex gap-2">
                                        <button
                                            onClick={() => handleEdit(fine)}
                                            className="bg-green-900 text-[var(--cream)] px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                        >
                                            Pay Fine
                                        </button>
                                        <button
                                            onClick={() => handleDelete(fine.id)}
                                            className="bg-red-800 text-white px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* PAID FINES TABLE */}
            <div className="overflow-x-auto shadow-md bg-white rounded-2xl p-4">
                <h2 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Paid Fines</h2>
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3">Member</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidFines.map(fine => (
                            <tr key={fine.id} className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]">
                                <td className="p-3">{getMemberName(fine.member_id)}</td>
                                <td className="p-3">{new Date(fine.date).toLocaleDateString()}</td>
                                <td className="p-3">{fine.amount}</td>
                                <td className="p-3 text-green-600 font-bold">Paid</td>
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

export default FineList;