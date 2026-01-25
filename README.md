# AI-Powered Job Application Tracker (MERN Stack):

An intelligent, full-stack web application that helps users to->"track job applications,monitor progress and gain AI-based insights" to improve their job search strategy.
---------------------------------------------------------------------------------------------

# Project Overview:

Applying for multiple jobs manually often leads to confusion, missed follow-ups, and poor tracking.
This project solves that problem by providing a "centralized job tracker" with "secure authentication, role-based access and AI-powered analytics".
---------------------------------------------------------------------------------------------

# Key Features:

## User Features
- Secure Signup & Login (JWT Authentication)
- Add, update, and delete job applications
- Track job status (Applied, Interview, Offer, Rejected)
- Clean dashboard with card-based UI
- AI Insights:
  - Total jobs applied
  - Interview conversion rate
  - Most targeted role
  - Actionable career insights

##Admin Features
- Role-based authorization
- View all users’ job applications
- Monitor overall application trends
- Clean admin dashboard
---------------------------------------------------------------------------------------------

# AI-Powered Insights:

The AI module analyzes user job data to->
- Identify application patterns
- Measure interview success rate
- Suggest strategic improvements

> This transforms raw job data into meaningful decision support, not just storage.

---------------------------------------------------------------------------------------------

# Tech Stack:

"Frontend"
- React.js (Vite)
- React Router
- Axios
- CSS (custom animations & UI)

"Backend"
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

"AI Logic"
- Pattern recognition on job data
- Insight generation using business rules

---------------------------------------------------------------------------------------------

# Security Features:

- JWT-based authentication
- Protected routes (User & Admin)
- Role-based authorization
- Environment variables protected using ` .env `
- Secure API access via middleware

---------------------------------------------------------------------------------------------

# Project Structure:

Job-Tracker-Project/
│
├── client/ # React Frontend
│ ├── src/
│ └── package.json
│
├── server/ # Node + Express Backend
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ └── server.js
│
├── .gitignore
└── README.md

---------------------------------------------------------------------------------------------

# How to Run Locally

# Clone the repository
``bash
git clone https://github.com/Rahull-06/Job-Tracker-Project.git.

---------------------------------------------------------------------------------------------
# Backend Setup:

cd server
npm install
npm run dev

```http://localhost:5000```

#Frontend Setup:

cd client
npm install
npm run dev

```http://localhost:5173```

--------------------------------------------------------------------------------------------

# ENVIRONMENT VARIABLES:

To keep sensitive data secure, the project uses environment variables:

| Variable | Description |

| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT authentication |

These values are excluded from version control using ``.gitignore``


--------------------------------------------------------------------------------------------

## API Endpoints (Overview):

# Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

# Jobs
- `GET /api/jobs`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`

# Admin
- `GET /api/jobs/all` (Admin only)

# AI Insights
- `GET /api/ai/insights`

