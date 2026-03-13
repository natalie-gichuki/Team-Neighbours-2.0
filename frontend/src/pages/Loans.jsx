import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchMyLoans } from '../redux/Slices/loanSlice';

const MemberLoans = () => {
    const dispatch = useDispatch();
    const { loans } = useSelector((state) => state.loan);

    useEffect(() => {
        dispatch(fetchMyLoans());
    }, [dispatch]);

    const pending = loans?.filter((l) => l.status === "borrowed") || [];
    const paid = loans?.filter((l) => l.status === "paid") || [];

    return (
        <div className="p-6 min-h-screen bg-[var(--cream)]">
            <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">My Loans</h2>

            {/* PENDING FINES */}
            <div className="overflow-x-auto shadow-md mb-8 bg-white rounded-2xl p-4">
                <h3 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Pending Loans</h3>
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pending.map((loan) => (
                            <tr
                                key={loan.id}
                                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                            >
                                <td className="p-3">{new Date(loan.date).toLocaleDateString()}</td>
                                <td className="p-3">{loan.amount}</td>
                                <td className="p-3 text-red-600 font-semibold">Borrowed</td>
                            </tr>
                        ))}
                        {pending.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-3 text-center text-gray-500">
                                    No pending loans.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAID FINES */}
            <div className="overflow-x-auto shadow-md mb-8 bg-white rounded-2xl p-4">
                <h3 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Paid Loans</h3>
                <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
                    <thead className="bg-[var(--brown-medium)] text-white">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paid.map((loan) => (
                            <tr
                                key={loan.id}
                                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                            >
                                <td className="p-3">{new Date(loan.date).toLocaleDateString()}</td>
                                <td className="p-3">{loan.amount}</td>
                                <td className="p-3 text-green-600 font-bold">Paid</td>
                            </tr>
                        ))}
                        {paid.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-3 text-center text-gray-500">
                                    No paid Loans.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MemberLoans;     