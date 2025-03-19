import React, { useState } from "react";
import Button from "../ui/Button";
import { db } from "../../services/StorageService";
import toast from "react-hot-toast";

const ResetProgress: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleResetProgress = () => {
    setLoading(true);
    db.clearDatabase()
      .then((data) => {
        toast.success("Storage has been reseted.");
      })
      .catch((error) => {
        toast.error("Error while reseting Storage");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full">
      <Button
        disabled={loading}
        onClick={handleResetProgress}
        className="font-sans invert-dark-class w-auto transition-all duration-300 rounded-sm flex p-2 mx-auto disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
      >
        <span className="inline-flex items-center justify-center">
          <i className="pi pi-database"></i>
        </span>
        <span className="inline-block flex-1 text-left px-2">
          Reset Storage
        </span>
      </Button>
    </div>
  );
};

export default ResetProgress;
