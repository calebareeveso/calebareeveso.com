import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
export default function Index(props) {
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
    <div className="mb-6" id="projects">
      {" "}
      <h1 className="text-base mb-3"> {">"} PROJECTS</h1>
      <div className="grid grid-cols-1 gap-6 ">
        {projectList.map(({ name, URL, info, ImageSource }, index) => (
          <ProjecCard
            projectName={name}
            projectURL={URL}
            projectInfo={info}
            projectIndex={index}
            projectImageSource={ImageSource}
          />
        ))}
      </div>
    </div>
  );
}
