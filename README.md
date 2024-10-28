
# Online Learning Platform

An online learning platform that enables users to browse and enroll in courses, manage their profiles, and engage with educational content. The platform is built using **React** for the frontend and **Node.js** with **Express** for the backend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register and login functionality (JWT-based authentication).
- **Course Management**: Users can browse available courses, enroll, and view course details.
- **Profile Management**: Manage user profiles and view enrolled courses.
- **Responsive Design**: The platform is fully responsive, offering a seamless experience on desktop and mobile.
- **Interactive UI**: Smooth navigation and real-time updates using React.
- **Backend API**: RESTful API built with Node.js and Express for data handling and storage.

## Tech Stack

### Frontend:
- **React**: Component-based architecture for the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Client-side routing for navigation.
- **Headless UI**: Accessible UI components.
  
### Backend:
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB and data modeling.
- **JWT**: JSON Web Tokens for authentication and session management.

### Others:
- **Fetch**: Promise-based HTTP client for API requests from the frontend.
- **Bcrypt.js**: Password hashing and security.
- **Dotenv**: Environment variable management.

## Installation

### Prerequisites:
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm (Node package manager) or yarn

### Steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ashutosh-Shukla-036/Online-Learning-platfrom.git
   cd online-learning-platform
   ```

2. **Backend Setup:**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory and add the following environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Frontend Setup:**

   ```bash
   cd ../client
   npm install
   ```

4. **Run the project:**

   - To run the **backend** server:

     ```bash
     cd server
     npm start
     ```

   - To run the **frontend** React app:

     ```bash
     cd ../client
     npm start
     ```

   The backend will be running on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Usage

1. **Home Page**: Users can view available courses on the homepage.
2. **Course Details**: Clicking on a course provides detailed information about the content, instructor, and enrollment option.
3. **Authentication**: Users can register and log in to manage their profiles and view their enrolled courses.

## Project Structure

```bash
online-learning-platform/
├── FrontEnd/            # React frontend code
│   ├── public/
│   └── src
│       ├── components/
│       ├── pages/
│       ├── services/  # Axios services for API calls
│       └── App.js
├── Backend/           # Node.js backend code
|   ├── db/            # DataBase connection
│   ├── controllers/   # Route handlers
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   ├── middlewares/   # Authentication and error handling
│   └── server.js      # Main entry point
└── README.md          # This file
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m "Add new feature"`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
