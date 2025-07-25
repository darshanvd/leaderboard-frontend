import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center min-h-[200px] w-full" role='loading'>
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
    <span className="ml-4 text-blue-text font-medium">Loading...</span>
  </div>
);

export default Loading;