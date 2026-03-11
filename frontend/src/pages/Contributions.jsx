import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContributionById } from "../redux/Slices/contributionsSlice";

const Contributions = () => {

    const dispatch = useDispatch();

    const { contributions, loading, error } = useSelector(
        (state) => state.contributions
    );

    const user = JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {
        if (user && user.id){
            dispatch(fetchContributionById(user.id));
        }
        
    }, [dispatch, user?.id]);

    const myContributions = Array.isArray(contributions)
        ? contributions.filter(c => c.member_id === user.id) 
        : [];

    

    return (
        <div>
            <h2>My Contributions</h2>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {myContributions.map((contribution) => (
                        <tr key={contribution.id}>
                            <td>{contribution.id}</td>
                            <td>{contribution.amount}</td>
                            <td>{new Date(contribution.date).toISOString().split("T")[0]}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default Contributions;