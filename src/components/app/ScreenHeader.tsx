import React from "react";
import { Link } from "react-router-dom";

interface ScreenHeaderProps {
  link: string;
  title?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  link = "/",
  title = "",
}) => {
  return (
    <div className="w-full flex items-center justify-center p-2">
      <Link
        to={link}
        className="px-4 py-3 dark-class rounded-full"
      >
        <i className="pi pi-chevron-left"></i>
      </Link>
      {title && (
        <p className="flex-1 mx-2 flex items-center justify-center text-xl md:text-3xl font-bold">
          {title}
        </p>
      )}
    </div>
  );
};

export default ScreenHeader;
