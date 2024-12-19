import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificatePage = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get("/api/certificates/user/123"); // Replace '123' with dynamic user ID
                setCertificates(response.data);
            } catch (err) {
                console.error("Error fetching certificates:", err);
                setError("Failed to load certificates.");
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Loading certificates...</p>
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
            <header className="py-10 bg-indigo-600 text-white text-center">
                <h1 className="text-4xl font-bold">My Certificates</h1>
                <p className="mt-2 text-lg">View and download your earned certificates.</p>
            </header>

            <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No certificates found.</p>
                ) : (
                    certificates.map((certificate) => (
                        <div
                            key={certificate._id}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-bold text-gray-800">
                                {certificate.course.title}
                            </h2>
                            <p className="text-gray-600">Grade: {certificate.grade || "N/A"}</p>
                            <a
                                href={certificate.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                View Certificate
                            </a>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default CertificatePage;
