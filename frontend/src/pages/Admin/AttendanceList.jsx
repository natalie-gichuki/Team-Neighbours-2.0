import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllAttendances,
    createAttendance,
    updateAttendance
} from "../../redux/Slices/attendanceSlice";
import { FetchAllMembers } from "../../redux/Slices/membersSlice";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer
} from "recharts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AttendanceList = () => {
    const dispatch = useDispatch();
    const { attendances, loading, error } = useSelector(state => state.attendance);

    const { members } = useSelector(state => state.members);

    const formRef = useRef(null);

    const [barByMember, setBarByMember] = useState([]);
    const [barByDate, setBarByDate] = useState([]);

    const [form, setForm] = useState({
        member_id: "",
        date: "",
        status: "present"
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllAttendances());
        dispatch(FetchAllMembers());
    }, [dispatch]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (editingId) {
            dispatch(updateAttendance({ id: editingId, attendanceData: form }))
                .unwrap()
                .then(() => {
                    toast.success("Attendance updated successfully!");
                    setEditingId(null);
                })
                .catch(() => toast.error("Failed to update attendance."));
        } else {
            dispatch(createAttendance(form))
                .unwrap()
                .then(() => toast.success("Attendance added successfully!"))
                .catch(() => toast.error("Failed to add attendance."));
        }

        setForm({ member_id: "", date: "", status: "present" });
    };
    const handleEdit = attendance => {
        setEditingId(attendance.id);
        setForm({
            member_id: attendance.member_id,
            date: attendance.date
                ? new Date(attendance.date).toISOString().split("T")[0]
                : "",
            status: attendance.status
        });

         toast.info("You are editing this attendance record. Update the form.");

        // Scroll to the form smoothly
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        if (attendances.length > 0) {
            // --- Attendance Per Member ---
            const memberMap = {};
            attendances.forEach(att => {
                if (!memberMap[att.member_id]) memberMap[att.member_id] = { name: att.member_id, present: 0, absent: 0, late: 0 };
                memberMap[att.member_id][att.status] += 1;
            });

            const memberArray = Object.values(memberMap).map(m => {
                const member = members.find(mem => mem.id === m.name);
                return { ...m, name: member ? member.name : m.name };
            });
            setBarByMember(memberArray);

            // --- Attendance Per Date ---
            const dateMap = {};
            attendances.forEach(att => {
                const date = new Date(att.date).toISOString().split("T")[0];
                if (!dateMap[date]) dateMap[date] = { date, present: 0, absent: 0, late: 0 };
                dateMap[date][att.status] += 1;
            });

            setBarByDate(Object.values(dateMap));
        }
    }, [attendances, members]);


    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                Attendance Management
            </h2>

            <div ref={formRef} className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-full">
                <h3 className="text-xl font-semibold mb-4 text-[var(--brown-dark)]">
                    {editingId ? "Edit Attendance" : "Add Attendance"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-[var(--brown-dark)] font-medium mb-1">
                            Member
                        </label>
                        <select
                            name="member_id" // keep member_id because backend still needs it
                            value={form.member_id}
                            onChange={handleChange}
                            required
                            className="w-full border border-[var(--beige)] rounded-lg p-2"
                        >
                            <option value="">Select a member</option>
                            {members && members.map(member => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Date */}
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-[var(--brown-dark)] font-medium mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-[var(--beige)] rounded-lg p-2"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-[var(--brown-dark)] font-medium mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-[var(--beige)] rounded-lg p-2"
                        >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full mt-4">
                        <button
                            type="submit"
                            className="bg-[var(--brown-medium)] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
                        >
                            {editingId ? "Update Attendance" : "Add Attendance"}
                        </button>
                    </div>
                </form>
            </div>

            {/* TABLE */}
            {loading && <p className="text-[var(--brown-dark)]">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto bg-white  shadow-md">
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead>
                        <tr className="bg-[var(--brown-medium)] text-white">
                            <th className="p-3 text-left">Member</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {attendances && attendances.length > 0 ? (
                            attendances.map(att => (
                                <tr
                                    key={att.id}
                                    className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                                >
                                    <td className="p-3">{members.find(m => m.id === att.member_id)?.name || att.member_id}</td>
                                    <td className="p-3">{new Date(att.date).toLocaleDateString()}</td>
                                    <td className="p-3 capitalize">{att.status}</td>
                                    <td className="p-3 flex justify-end gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleEdit(att)}
                                            className="bg-[var(--brown-dark)] text-[var(--cream)] px-3 py-1 rounded-lg shadow-sm hover:opacity-90 transition"
                                        >
                                            Edit Attendance
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center p-6 text-[var(--brown-dark)]"
                                >
                                    No attendance records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 space-y-10">
                <h2 className="text-2xl font-bold text-[var(--brown-dark)]">
                    Attendance Analytics
                </h2>
                <div className="p-6 space-y-10">
                    <h2 className="text-xl font-bold text-[var(--brown-dark)]">
                        Attendance Analytics
                    </h2>

                    {/* Bar Chart: Attendance Per Member */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-[var(--brown-dark)]">Attendance Per Member</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={barByMember} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0d8d0" />
                                <XAxis dataKey="name" tick={{ fill: '#5a4638', fontSize: 14 }} />
                                <YAxis tick={{ fill: '#5a4638', fontSize: 14 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff7e6', borderRadius: '10px', border: 'none', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                                    labelStyle={{ color: '#5a4638', fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ color: '#5a4638', fontWeight: 'bold' }} />
                                <Bar dataKey="present" fill="url(#presentGradient)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                <Bar dataKey="absent" fill="url(#absentGradient)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                <Bar dataKey="late" fill="url(#lateGradient)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                {/* Gradient Definitions */}
                                <defs>
                                    <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--brown-dark)" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="var(--brown-dark)" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#bb290c" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#5a0e07" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="lateGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#aa8e47" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#493806" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart: Attendance Per Date */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-[var(--brown-dark)]">Attendance Per Date</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={barByDate} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0d8d0" />
                                <XAxis dataKey="date" tick={{ fill: '#5a4638', fontSize: 14 }} />
                                <YAxis tick={{ fill: '#5a4638', fontSize: 14 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff7e6', borderRadius: '10px', border: 'none', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                                    labelStyle={{ color: '#5a4638', fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ color: '#5a4638', fontWeight: 'bold' }} />
                                <Bar dataKey="present" fill="url(#presentGradient2)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                <Bar dataKey="absent" fill="url(#absentGradient2)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                <Bar dataKey="late" fill="url(#lateGradient2)" radius={[5, 5, 0, 0]} animationDuration={1000} />
                                {/* Gradient Definitions */}
                                <defs>
                                    <linearGradient id="presentGradient2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="var(--brown-dark)" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="var(--brown-medium)" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="absentGradient2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a63f2b" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#74302b" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="lateGradient2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#b5912f" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#7c651f" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
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

export default AttendanceList;