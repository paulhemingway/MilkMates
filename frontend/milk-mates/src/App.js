import Landing from "pages/Landing";
import Layout from "pages/Layout";
import Dashboard from "pages/Dashboard";
import NoPage from "pages/NoPage";
import Help from "pages/Help";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />

        {/* everything within here will have the navbar */}
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="help" element={<Help />} />
        {/* this path value points to all other paths. It's for the 404 not found page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
