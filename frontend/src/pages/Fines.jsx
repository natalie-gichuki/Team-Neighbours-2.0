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
      <div className="overflow-x-auto shadow-md mb-8 bg-white p-4">
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
      <div className="overflow-x-auto shadow-md mb-8 bg-white p-4">
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

      {/* PAYMENT METHODS */}
      <div className="bg-white shadow-md p-6 mb-8 border border-[var(--beige)]">
        <h3 className="text-2xl font-bold mb-6 text-[var(--brown-dark)]">
          Payment Methods
        </h3>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Bank Transfers */}
          <div className="bg-[var(--cream)] border border-[var(--beige)] rounded-xl p-5">
            <h4 className="text-xl font-semibold text-[var(--brown-medium)] mb-4">
              Bank Transfers
            </h4>

            <div className="space-y-3">
              {[
                "Cooperative Bank",
                "KCB Bank",
                "Stanbic Bank",
                "ABSA Bank",
                "NCBA Bank",
                "Equity Bank"
              ].map((bank, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm border border-[var(--beige)]"
                >
                  <span className="font-medium">{bank}</span>
                  <span className="text-[var(--brown-dark)] font-semibold">
                    {Math.floor(1000000000 + Math.random() * 9000000000)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* M-Pesa */}
          <div className="bg-[var(--cream)] border border-[var(--beige)] rounded-xl p-5">
            <h4 className="text-xl font-semibold text-green-700 mb-4">
              M-Pesa
            </h4>

            <div className="bg-white shadow-sm border border-[var(--beige)] p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Paybill</span>
                <span className="font-semibold text-[var(--brown-dark)]">
                  {Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Account Number</span>
                <span className="font-semibold text-[var(--brown-dark)]">
                  {Math.floor(10000000 + Math.random() * 90000000)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Fine;