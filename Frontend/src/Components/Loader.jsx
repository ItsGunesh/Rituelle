import React from 'react'

const Loader = () => (
    <div className="flex justify-center items-center">
      <svg className="animate-spin h-6 w-6 text-purple-600" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
);

export default Loader
