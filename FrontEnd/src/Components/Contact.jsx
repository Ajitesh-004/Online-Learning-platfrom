import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Header Section */}
        <header className="bg-blue-100 py-10">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg">
                We value your satisfaction. If you have any questions or need assistance, please don’t hesitate to reach out!
            </p>
            </div>
        </header>

      {/* Main Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap -mx-4">
          {/* Contact Information */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span>
                <br /> +91 6363730986
                <br /> +91 9535440402
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>
                <br />
                <a href="mailto:info@itdefined.org" className="text-blue-500">
                  info@itdefined.org
                </a>
                <br />
                <a href="mailto:support@itdefined.org" className="text-blue-500">
                  support@itdefined.org
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Location:</span>
                <br /> Whitefield, Bangalore, Karnataka 560067
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 lg:w-2/3 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-600 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 IT DEFINED. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
