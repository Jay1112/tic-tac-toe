import React from "react";
import Container from "../components/app/Container";
import ScreenHeader from "../components/app/ScreenHeader";
import ResetProgress from "../components/app/ResetProgress";

const SettingsPage: React.FC = () => {
  return (
    <Container className="p-2 fade-in-up h-full flex flex-col items-start justify-start">
      <ScreenHeader
        link="/"
        title="Settings"
      />
      <div className="w-full my-2 h-full flex items-center justify-center px-2">
        <ResetProgress/>
      </div>
    </Container>
  );
};

export default SettingsPage;
