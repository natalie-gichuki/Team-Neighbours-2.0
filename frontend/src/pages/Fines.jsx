import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFines } from "../redux/Slices/fineSlice";

const Fine = () => {
  const dispatch = useDispatch();
  const { fines } = useSelector((state) => state.fine);

  useEffect(() => {
    dispatch(fetchMyFines());
  }, [dispatch]);

  const pending = fines?.filter((f) => f.status === "pending") || [];
  const paid = fines?.filter((f) => f.status === "paid") || [];

  return (
    <div className="p-6 min-h-screen bg-[var(--cream)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">My Fines</h2>

      {/* PENDING FINES */}
      <div className="overflow-x-auto shadow-md mb-8 bg-white rounded-2xl p-4">
        <h3 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Pending Fines</h3>
        <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
          <thead className="bg-[var(--brown-medium)] text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((fine) => (
              <tr
                key={fine.id}
                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
              >
                <td className="p-3">{new Date(fine.date).toLocaleDateString()}</td>
                <td className="p-3">{fine.amount}</td>
                <td className="p-3">{fine.reason}</td>
                <td className="p-3 text-red-600 font-semibold">Pending</td>
              </tr>
            ))}
            {pending.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No pending fines.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAID FINES */}
      <div className="overflow-x-auto shadow-md mb-8 bg-white rounded-2xl p-4">
        <h3 className="text-2xl font-bold mb-4 text-[var(--brown-dark)]">Paid Fines</h3>
        <table className="min-w-full border-collapse border border-[var(--beige)] text-left">
          <thead className="bg-[var(--brown-medium)] text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paid.map((fine) => (
              <tr
                key={fine.id}
                className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
              >
                <td className="p-3">{new Date(fine.date).toLocaleDateString()}</td>
                <td className="p-3">{fine.amount}</td>
                <td className="p-3">{fine.reason}</td>
                <td className="p-3 text-green-600 font-bold">Paid</td>
              </tr>
            ))}
            {paid.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No paid fines.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fine;