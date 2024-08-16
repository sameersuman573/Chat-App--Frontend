import { ErrorOutlineRounded } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div class="bg-gradient-to-b from-violet-600/10 via-transparent">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div class="flex justify-center">
          <a
            class="group inline-flex items-center bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
            href="../figma.html"
          >
            <p class="me-2 text-white text-sm">Lets Share Emotions Together.</p>
            <span class="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
              <svg
                class="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <div class="max-w-3xl text-center mx-auto">
          <h1 class="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
.
          </h1>
        </div>

        <div class="max-w-3xl text-center mx-auto">
          <p class="text-lg text-white/70">
            .
          </p>
        </div>

 
      <div class="text-center">
        <Link
          to="/home"
          class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6"
        >
          Get started
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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

{
  /* <Container
maxWidth="lg"
sx={{
  height: "100vh",
}}
>
<div>
  <ErrorOutlineRounded sx={{
    fontSize: "10rem"
  }} />
  <Typography variant="h1">404 Not Found</Typography>
  <Link to="/home">Go Back to Home </Link>
</div>
</Container> */
}
