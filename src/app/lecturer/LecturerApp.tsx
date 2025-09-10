import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider, useAuth } from "../auth/AuthContext";
import LecturerHeader from "./view/Header";
import LecturerDashboard from "./view/Dashboard";
import LecturerCourses from "./view/Courses";
import LecturerSchedule from "./view/Schedule"; 
import LecturerStudents from "./view/Students";
import DyteMain from "./view/components/dyte_main";
import DyteJr from "./view/components/dyte_jr"
import ProfilePage from "./view/Profile";


const LecturerAppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {  } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`}>
      <LecturerHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex pt-16">
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-8"}`}>
          <div className="container mx-auto py-4 px-4 md:px-6">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/lecturer" />} />
              <Route exact path="/lecturer">
                <LecturerDashboard  />
              </Route>
              <Route path="/courses">
                <LecturerCourses  />
              </Route>
              <Route path="/schedule">
                <LecturerSchedule  />
              </Route>
              <Route path="/students">
                <LecturerStudents />
              </Route>
              <Route path="/live">
                <DyteMain />
              </Route>
              <Route path="/live-doubt">
                <DyteJr />
              </Route>
              <Route path="/profile">
                <ProfilePage isDarkMode={isDarkMode} />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
};

const LecturerApp: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <LecturerAppContent />
      </Router>
    </AuthProvider>
  );
};

export default LecturerApp;