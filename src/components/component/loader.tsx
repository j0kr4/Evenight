import { LoaderCircle } from "lucide-react";
import React from "react";
const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};
export default Loader;
