import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "pages/Landing";
import Layout from "pages/Layout";
import Dashboard from "pages/Dashboard";
import { useState } from "react";
import NoPage from "pages/NoPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
