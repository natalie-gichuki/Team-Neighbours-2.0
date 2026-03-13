import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllAttendances,
    createAttendance,
    updateAttendance,
    deleteAttendance
} from "../../redux/Slices/attendanceSlice";
import { FetchAllMembers } from "../../redux/Slices/membersSlice";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer
} from "recharts";


const AttendanceList = () => {
    const dispatch = useDispatch();
    const { attendances, loading, error } = useSelector(state => state.attendance);

    const { members } = useSelector(state => state.members);

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
            dispatch(updateAttendance({ id: editingId, attendanceData: form }));
            setEditingId(null);
        } else {
            dispatch(createAttendance(form));
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

            {/* FORM */}
            {/* FORM */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-full">
                <h3 className="text-xl font-semibold mb-4 text-[var(--brown-dark)]">
                    {editingId ? "Edit Attendance" : "Add Attendance"}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
                    {/* Member ID */}
                    {/* Member Name */}
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
                                    {/* Member Name */}
                                    <td className="p-3">{members.find(m => m.id === att.member_id)?.name || att.member_id}</td>

                                    {/* Date */}
                                    <td className="p-3">{new Date(att.date).toLocaleDateString()}</td>

                                    {/* Status */}
                                    <td className="p-3 capitalize">{att.status}</td>

                                    {/* Actions */}
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

            <div className="p-6 space-y-10">
                <h2 className="text-2xl font-bold text-[var(--brown-dark)]">
                    Attendance Analytics
                </h2>

                {/* Bar Chart: Attendance Per Member */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Attendance Per Member</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barByMember}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="present" fill="#2a662c" />
                            <Bar dataKey="absent" fill="#74302b" />
                            <Bar dataKey="late" fill="#725f27" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart: Attendance Per Date */}
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Attendance Per Date</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barByDate}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="present" fill="#2a662c" />
                            <Bar dataKey="absent" fill="#74302b" />
                            <Bar dataKey="late" fill="#7c651f" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AttendanceList;