import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
import { useState } from "react";
export default function Index(props) {
  const [IsOpen, setIsOpen] = useState(false);
  // list of projects
  const projectList = [
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
  ];
  return (
    <div className="mb-6 relative" id="projects">
      {IsOpen !== true && (
        <div className="absolute top-[85%] z-50 flex justify-center w-full">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 rounded-md text-[10px] sm:text-sm bg-primary text-white"
          >
            SEE PROJECTS
          </button>
        </div>
      )}
      <div className="flex justify-between ">
        <h1 className="text-base mb-3"> {">"} PROJECTS</h1>
        {IsOpen === true && (
          <button onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#3A3A3A"
              className="mb-1"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 xs:gap-6 ">
        {projectList.map(({ name, URL, info, ImageSource }, index) => (
          <ProjecCard
            projectName={name}
            projectURL={URL}
            projectInfo={info}
            projectIndex={index}
            projectImageSource={ImageSource}
            projectIsOpen={IsOpen}
          />
        ))}
      </div>
    </div>
  );
}
