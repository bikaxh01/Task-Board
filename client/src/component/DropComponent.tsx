import React, { useState } from "react";

function DropComponent() {
  const [active, setActive] = useState(false);

  return (
    <div
      className=" min-h-2 bg-red-500"
      onDragEnterCapture={() => setActive(true)}
      onDragLeaveCapture={() => setActive(false)}
    >
      {active ? (
        <div className=" bg-gray-600  text-xs text-primary  h-18 rounded-md flex items-center justify-center">
          Drop Here
        </div>
      ) : (
        <div className=" flex items-center justify-center  ">
          <div className=" border border-dashed  border-indigo-500/25 w-full "></div>
        </div>
      )}
    </div>
  );
}

export default DropComponent;
