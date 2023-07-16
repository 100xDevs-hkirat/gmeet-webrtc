import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'
import { LandingPage } from "./components/LandingPage";
import { MeetingPage } from "./components/MeetingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meeting/:roomId" element={<MeetingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
