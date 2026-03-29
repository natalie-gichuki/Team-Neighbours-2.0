import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyContributions } from "../redux/Slices/contributionsSlice";

const Contributions = () => {
    const dispatch = useDispatch();

    const { contributions, loading, error } = useSelector(
        (state) => state.contributions
    );


    const user = JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        dispatch(fetchMyContributions());
    }, [dispatch]);

    const myContributions = Array.isArray(contributions) ? contributions : [];

    const totalContributions = myContributions.reduce((sum, c) => {
        const amount = parseFloat(c.amount) || 0; // ensure amount is a number
        return sum + amount;
    }, 0);

    return (
        <div className="p-8 bg-[var(--cream)] min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-[var(--brown-dark)]">
                My Contributions
            </h2>


            <p className="text-xl font-semibold mb-4 text-[var(--brown-dark)]">
                Total Contributions: KSh {totalContributions.toLocaleString()}
            </p>


            {/* STATUS */}
            {loading && <p className="text-[var(--brown-dark)] mb-4">Loading...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* TABLE */}
            <div className="overflow-x-auto bg-white  shadow-md">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[var(--brown-medium)] text-white">

                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myContributions.length > 0 ? (
                            myContributions.map((contribution) => (
                                <tr
                                    key={contribution.id}
                                    className="odd:bg-[var(--cream)] even:bg-white border-t border-[var(--beige)]"
                                >

                                    <td className="p-3">KSh {contribution.amount}</td>
                                    <td className="p-3">
                                        {new Date(contribution.date)
                                            .toISOString()
                                            .split("T")[0]}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center p-6 text-[var(--brown-dark)]"
                                >
                                    No contributions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAYMENT METHODS */}
            <div className="bg-white shadow-md p-6 mt-8 mb-8 border border-[var(--beige)]">
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

export default Contributions;