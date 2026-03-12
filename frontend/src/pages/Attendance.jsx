import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAttendances } from "../redux/Slices/attendanceSlice";

const Attendances = () => {
    const dispatch = useDispatch();
    const { myAttendances, loading, error } = useSelector(state => state.attendance);

    useEffect(() => {
        dispatch(fetchMyAttendances());
    }, [dispatch]);

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                My Attendance Records
            </h2>

            {/* STATUS */}
            {loading && <p className="text-[var(--brown-dark)] mb-4">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* TABLE */}
            <div className="overflow-x-auto bg-white shadow-md">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[var(--brown-medium)] text-white">
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myAttendances && myAttendances.length > 0 ? (
                            myAttendances.map((att) => (
                                <tr
                                    key={att.id}
                                    className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                                >
                                    <td className="p-3">
                                        {new Date(att.date)
                                            .toISOString()
                                            .split("T")[0]}
                                    </td>
                                    <td className="p-3 capitalize">{att.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center p-6 text-[var(--brown-dark)]"
                                >
                                    No attendance records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendances;