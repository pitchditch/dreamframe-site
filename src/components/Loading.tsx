
import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-bc-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
