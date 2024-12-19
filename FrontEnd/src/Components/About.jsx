import React from "react";

export const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">About IT Defined</h1>
        <p className="mt-4 text-lg text-gray-600">
          Shaping the future of IT professionals with cutting-edge training.
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Who We Are
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6">
          At IT Defined, we are passionate about shaping the future of IT
          professionals by providing cutting-edge training programs designed to
          meet the demands of today’s tech-driven world. Headquartered in
          Bangalore, we specialize in delivering expert-led courses in Cloud
          Computing, DevOps, Machine Learning, Data Science, Artificial
          Intelligence, and Embedded Systems.
        </p>
        <p className="text-lg text-gray-600 text-center mb-6">
          Our approach combines industry-relevant curricula with hands-on
          learning experiences, ensuring students not only understand concepts
          but can apply them in real-world scenarios. With highly experienced
          trainers and state-of-the-art resources, we strive to bridge the gap
          between knowledge and practice.
        </p>
        <p className="text-lg text-gray-600 text-center">
          What sets us apart is our commitment to creating a flexible and
          engaging learning environment. Through interactive sessions, practical
          exercises, and open discussions, we foster growth and empower learners
          to achieve their career goals. Whether you're a student, a working
          professional, or a tech enthusiast, IT Defined is your partner in
          building a brighter future in the IT industry.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800">Expert Instructors</h3>
            <p className="mt-2 text-gray-600">
              Learn from industry experts with real-world experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800">Flexible Learning</h3>
            <p className="mt-2 text-gray-600">
              Study at your own pace with our flexible course schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-gray-800">Comprehensive Curriculum</h3>
            <p className="mt-2 text-gray-600">
              Gain hands-on experience with our comprehensive curriculum.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-100 py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-4">
            Interested in our courses or have any questions? Reach out to us
            and we'll get back to you as soon as possible!
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};
