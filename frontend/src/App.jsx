import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import PostJob from './components/admin/Postjob'
import AdminJobs from './components/admin/AdminJobs'
import Applicants from './components/admin/Applicants'
import VerifyUser from './components/auth/VerifyUser'
import ForgotPassword from './components/auth/ForgotPassword'
import ProtectedRoute from './components/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/verify-user',
    element:<VerifyUser />
  },
  {
    path:"/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: '/jobs',
    element:<Jobs />
  },
  {
    path:'/browse',
    element: <Browse />
  },
  {
    path:'/profile',
    element:<Profile />
  },
  {
    path:'/description/:id',
    element: <JobDescription />
  },

  // admin route
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path: '/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/:id/',
    element: <ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants/></ProtectedRoute> 
  }
])
function App() {

  return (
    <>
      <RouterProvider router = {appRouter} />
    </>
  )
}

export default App
