import React, { useState } from "react";
import LiveClass from "../components/LiveClass";
import SubjectTopic from "../components/SubjectTopic";

interface HomeProps {
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <LiveClass
        isDarkMode={isDarkMode}
        selectedSubjectId={selectedSubjectId} 
        onSubjectSelect={(id) => setSelectedSubjectId(id)}
      />
      <SubjectTopic
        selectedSubjectId={selectedSubjectId}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Home;
