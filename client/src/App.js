import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>

    // <div >
    //   <Navbar/>
    //   <Dashboard/>
    //   <ProjectDetails/>
    // </div>
  );
}

export default App;
