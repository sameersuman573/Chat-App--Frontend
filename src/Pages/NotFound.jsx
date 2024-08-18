import { Link } from "react-router-dom";
import React, { useState } from "react";

function NotFound() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset the clicked state after the animation duration
    setTimeout(() => {
      setIsClicked(false);
    }, 200); // Match this duration with the animation duration
  };

  return (
    <div className="bg-gradient-to-b from-violet-600/10 via-transparent fade-in animation-fadeIn">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div className="flex justify-center">
          {/* Optional content */}
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            .
          </h1>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-white/70">.</p>
        </div>

        <div className="text-center">
          <Link
            to="/home"
            className={`inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${isClicked ? 'animation-buttonClick' : ''}`}
            onClick={handleClick}
          >
            Get started
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
