import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
export default function Index(props) {
  // list of projects
  const projectList = [
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Africa's leading digital media platform.",
      ImageSource: "/static/images/snitchafrica.png",
    },
  ];
  return (
    <div>
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
  );
}
