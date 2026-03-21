E-Commerce Web Application

A full-stack E-Commerce web application built using the MERN stack, featuring product browsing, user authentication, and order management. The application is enhanced with DevOps practices including containerization, CI/CD, and orchestration.

🚀 Live Demo

🔗 https://e-commerce-website055.netlify.app/

📌 Features
🔐 User Authentication (JWT-based login & signup)
🛍️ Browse Products with detailed view
🛒 Add to Cart & Manage Cart Items
💳 Order Placement functionality
📦 Backend API for product & user management
⚡ Fast and responsive UI

🛠️ Tech Stack
Frontend
React.js (Vite)
JavaScript (ES6+)
HTML5 & CSS3
Backend
Node.js
Express.js
Database
MongoDB


DevOps & Deployment
🐳 Docker
🔄 Jenkins (CI/CD)
☸️ Kubernetes
🌐 Netlify (Frontend)
🚀 Render (Backend)
⚙️ DevOps Implementation
🐳 Containerized frontend and backend using Docker
🔄 Implemented CI/CD pipeline using Jenkins for automated build and deployment
☸️ Deployed application on Kubernetes cluster for scalability and high availability
📦 Built Docker images for both client and server
🚀 Enabled continuous deployment workflow


📂 Project Structure
E-COMMERCE/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node/Express)
├── k8s/           # Kubernetes configuration files
├── Jenkinsfile    # CI/CD pipeline configuration
├── render.yaml    # Deployment configuration
├── vite.config.js
└── README.md


⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Surya-M2002/e-commerce.git
cd e-commerce
2️⃣ Setup Backend
cd server
npm install
npm start
3️⃣ Setup Frontend
cd client
npm install
npm run dev


🐳 Docker Setup
Build Docker Images
docker build -t ecommerce-client ./client
docker build -t ecommerce-server ./server
Run Containers
docker run -d -p 3000:3000 ecommerce-client
docker run -d -p 5000:5000 ecommerce-server


☸️ Kubernetes Deployment
Managed container orchestration using Kubernetes
Created deployment and service YAML files
Enabled application scalability and load balancing
kubectl apply -f k8s/
🔄 CI/CD Pipeline (Jenkins)
Integrated GitHub repository with Jenkins
Automated build and deployment process
Triggered pipeline on code push
🔐 Environment Variables

Create a .env file in the server folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
📸 Screenshots
<img width="1918" height="900" alt="Screenshot 1" src="https://github.com/user-attachments/assets/abca80d7-3e74-43ad-a343-da78cfa16e98" /> <img width="1919" height="894" alt="Screenshot 2" src="https://github.com/user-attachments/assets/51c1251e-cdd2-4a81-970d-dfee419f1c01" /> <img width="1919" height="899" alt="Screenshot 3" src="https://github.com/user-attachments/assets/7a92d19a-203c-4ec1-aaf1-b21e047244bc" />


📈 Future Enhancements
💳 Payment Gateway Integration (Stripe/Razorpay)
📦 Order Tracking System
⭐ Product Reviews & Ratings
🧑‍💼 Admin Dashboard
👨‍💻 Author

Surya M

GitHub: https://github.com/Surya-M2002
⭐ Acknowledgements

This project was developed as part of learning and building real-world full-stack applications.
