import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import OwnerDashboard from "./pages/owner/dashboard";
import CustomerDashboard from "./pages/customer/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route 
        path="/owner/dashboard"
        element={<OwnerDashboard />}
      />

      <Route 
        path="/customer/dashboard"
        element={<CustomerDashboard />}
      />
    </Routes >
  )
}

export default App