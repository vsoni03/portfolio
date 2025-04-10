import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogoSplash from "./components/LogoSplash";
import ProfileSelection from "./components/ProfileSelection";
import RecruiterProfile from "./components/RecruiterProfile";
import FriendProfile from "./components/FriendProfile";
import StalkerProfile from "./components/StalkerProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSplash />} />
        {/* Routes for each profile after splash */}
        <Route path="/profile/recruiter" element={<RecruiterProfile />} />
        <Route path="/profile/friend" element={<FriendProfile />} />
        <Route path="/profile/stalker" element={<StalkerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
