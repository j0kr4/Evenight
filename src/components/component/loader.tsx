import { LoaderCircle } from "lucide-react";
import React from "react";
const Loader = () => {
  return (
    <div className="animate-spin">
      <LoaderCircle />
    </div>
  );
};
export default Loader;
