# JobHunt
JobHunt is a modern, full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to streamline the hiring process for employers and job seekers.

The Job Portal is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to create profiles, search for job listings, and apply to jobs. Employers can post job openings and manage applications. 

## The project includes the following key features:

User Authentication: Sign up, login, and JWT-based authentication.
Job Listings: Browse and search for job opportunities.
Profile Management: Users can upload resumes, edit profile details, and track job applications.
Admin Panel: Employers can post job openings, view applicant profiles, and manage applications.

## Technologies Used

Frontend: React.js, Tailwind CSS, Axios
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Cloud Storage: Cloudinary (for profile pictures and resumes)

## How to Clone the Project
Follow the steps below to clone and set up the project locally.

### Step 1: Clone the Repository
bash
```
git clone https://github.com/your-username/JobHunt.git
cd JobHunt
```

### Step 2: Set Up the Backend

#### Navigate to the backend folder.
```
cd backend
```

#### Install the required dependencies.
```
npm install
```

#### Create a .env file in the root of the backend folder and add the following environment variables:
```
MONGO_URI=your-mongodb-connection-uri
JWT_SECRET=your-secret-key
CLOUDINARY_URL=your-cloudinary-url
PORT=8081
```

#### Start the backend server.
```
npm start
```

The backend server will run on http://localhost:8081.

## Step 3: Set Up the Frontend

### Navigate to the frontend folder.
```
cd frontend
```

### Install the required dependencies.

```
npm install
```

### Start the frontend server.
```
npm start
```

The frontend will run on http://localhost:5173.

## How to Use

+ Sign Up/Login: Users can create an account or log in to access their profiles and apply for jobs.
+ Post Jobs: Employers can log in and post job listings through the dashboard.
+ Search Jobs: Users can search for job opportunities based on keywords, location, and job type.
+ Apply for Jobs: Users can apply for jobs by submitting their resumes and profile details.
