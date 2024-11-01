export const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-5">
            
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Online Learning Platform</h1>
                <p className="mt-4 text-lg text-gray-600">Learn from the best courses anytime, anywhere.</p>
            </header>

            
            <section className="max-w-6xl mx-auto py-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold text-gray-800">Expert Instructors</h3>
                        <p className="mt-2 text-gray-600">Learn from industry experts with real-world experience.</p>
                    </div>
                  
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold text-gray-800">Flexible Learning</h3>
                        <p className="mt-2 text-gray-600">Study at your own pace with our flexible course schedule.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold text-gray-800">Comprehensive Curriculum</h3>
                        <p className="mt-2 text-gray-600">Gain hands-on experience with our comprehensive curriculum.</p>
                    </div>
                </div>
            </section>

            <section className="bg-blue-100 py-10">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What Our Students Say</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-gray-600 italic">"This platform has transformed my learning experience!"</p>
                        <p className="mt-2 font-bold text-gray-800">- Jane Doe</p>
                    </div>
                 
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-gray-600 italic">"I love the flexibility to learn at my own pace!"</p>
                        <p className="mt-2 font-bold text-gray-800">- John Smith</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
