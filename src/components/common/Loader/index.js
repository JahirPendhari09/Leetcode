import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-10 backdrop-blur-sm z-50">
      <div className="w-10 h-10 border-4 border-t-transparent border-neutral-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
