import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

const PaymentHistoryPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useRecoilState(userAtom)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/payments/getpayments/${user.userId}`); // Replace '123' with dynamic user ID
                setPayments(response.data);
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError("Failed to load payment history.");
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Loading payment history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="py-10 bg-green-600 text-white text-center">
                <h1 className="text-4xl font-bold">Payment History</h1>
                <p className="mt-2 text-lg">Review all your past transactions.</p>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                {payments.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No payment history found.</p>
                ) : (
                    <div className="space-y-4">
                        {payments.map((payment) => (
                            <div
                                key={payment._id}
                                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {payment.course.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        Amount: ₹{payment.amount}
                                    </p>
                                    <p className="text-gray-600">
                                        Payment Method: {payment.paymentMethod}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        payment.paymentStatus === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {payment.paymentStatus}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PaymentHistoryPage;
