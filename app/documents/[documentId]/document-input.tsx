import { CloudCheckIcon } from "lucide-react";
import React from "react";

const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <CloudCheckIcon size={20} />
    </div>
  );
};

export default DocumentInput;
