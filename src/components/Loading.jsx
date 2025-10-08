import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        <p className="text-gray-600 font-semibold">Calculando...</p>
      </div>
    </div>
  );
};

export default Loading;
