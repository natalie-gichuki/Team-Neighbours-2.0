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
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
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
        </div>
    );
};

export default Contributions;