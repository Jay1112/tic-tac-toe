import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className="w-screen mob-h-screen bg-gray-200">
      <div className={`max-w-xl mx-auto ${className ? className : ""}`}>{children}</div>
    </div>
  );
};

export default Container;
