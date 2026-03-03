# Salem E-commerce Project

A full-stack e-commerce application built with React, Vite, Node.js, Express, and MongoDB.

## Features

- **Product Management**: Category-based product browsing.
- **Shopping Cart**: Real-time cart updates with drawers.
- **User Authentication**: Secure login and registration.
- **Admin Dashboard**: For managing products and orders.
- **Responsive UI**: Built with React Bootstrap and Framer Motion.

## Tech Stack

- **Frontend**: React, Vite, React Router, React Bootstrap, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt.
- **Deployment**: Render (configured via `render.yaml`).

## Project Structure

- `client/`: Frontend React application.
- `server/`: Backend Express server.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce.git
   cd e-commerce
   ```

2. Install dependencies for both client and server:

   ```bash
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `client/` directory and add:
     ```env
     VITE_APPWRITE_PROJECT_ID=your_project_id
     VITE_APPWRITE_PROJECT_NAME=your_project_name
     VITE_APPWRITE_ENDPOINT=your_endpoint
     ```
   - Create a `.env` file in the `server/` directory and add:
     ```env
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

- **Frontend (Client)**:

  ```bash
  cd client
  npm run dev
  ```

- **Backend (Server)**:
  ```bash
  cd server
  npm run dev
  ```

## Deployment

The project is configured for deployment on Render using the `render.yaml` file.

## License

MIT
