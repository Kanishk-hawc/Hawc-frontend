import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./view/header";
import Footer from "./view/footer";
import Home from "./view/home";
import LiveVedio from "./components/LiveVideo";
import CourseClass from "./components/CourseClass";
import VideoPlayer from "./cards/VideoPlayer";

const AppFront: React.FC = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDarkMode = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="flex-grow w-full text-gray-900 dark:text-white">
        <Switch>
          <Route exact path="/">
             <Home isDarkMode={isDarkMode} />
          </Route>
          <Route path="/live">
            <LiveVedio isDarkMode={isDarkMode} />
          </Route>
          <Route path="/course">
            <CourseClass isDarkMode={isDarkMode} />
          </Route>
          <Route path="/play">
            <VideoPlayer  />
          </Route>

        </Switch>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default AppFront;
