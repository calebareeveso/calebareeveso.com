import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
import { useState } from "react";
export default function Index(props) {
  const [IsOpen, setIsOpen] = useState(false);
  // list of projects
  const projectList = [
    {
      name: "SNITCHAFRICA.COM",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCHAFRICA.COM",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCHAFRICA.COM",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "SNITCHAFRICA.COM",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Gen Z Africans digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
  ];
  return (
    <div className="mb-6 relative" id="projects">
      <div className="flex justify-between ">
        <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-6 sm:mb-8">
          Projects
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-5 xs:gap-6 ">
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
