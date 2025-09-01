import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import LecturerHeader from "./view/Header";
import LecturerDashboard from "./view/Dashboard";
import LecturerCourses from "./view/Courses";
import LecturerSchedule from "./view/Schedule"; 
import LecturerStudents from "./view/Students";

const LecturerApp: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <LecturerHeader />
          <main className="container mx-auto py-4">
            <Switch>
              <Route exact path="/lecturer" component={LecturerDashboard} />
              <Route path="/courses" component={LecturerCourses} />
              <Route path="/schedule" component={LecturerSchedule} />
              <Route path="/students" component={LecturerStudents} />
            </Switch>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default LecturerApp;