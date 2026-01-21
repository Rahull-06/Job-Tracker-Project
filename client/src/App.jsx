// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Admin from "./pages/Admin";
// import AddJob from "./pages/AddJob";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import AIInsights from "./pages/AIInsights";
// import Home from "./pages/Home";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/add-job"
//           element={
//             <ProtectedRoute>
//               <AddJob />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <Admin />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/ai-insights"
//           element={
//             <ProtectedRoute>
//               <AIInsights />
//             </ProtectedRoute>
//           }
//         />

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AddJob from "./pages/AddJob";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import AIInsights from "./pages/AIInsights";
import Home from "./pages/Home";

// =====================================
// This component handles animated routes
// =====================================
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      {/* Page Transition Wrapper */}
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <AIInsights />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </>
  );
}

// =====================================
// Main App with BrowserRouter
// =====================================
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
