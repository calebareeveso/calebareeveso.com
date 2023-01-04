import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
export default function Index(props) {
  // list of projects
  const projectList = [
    {
      name: "SNITCH AFRICA",
      URL: "https://www.snitchafrica.com/",
      info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    },
    // {
    //   name: "SNITCH AFRICA",
    //   URL: "https://www.snitchafrica.com/",
    //   info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    // },
    // {
    //   name: "SNITCH AFRICA",
    //   URL: "https://www.snitchafrica.com/",
    //   info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    // },
    // {
    //   name: "SNITCH AFRICA",
    //   URL: "https://www.snitchafrica.com/",
    //   info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    // },
    // {
    //   name: "SNITCH AFRICA",
    //   URL: "https://www.snitchafrica.com/",
    //   info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    // },
    // {
    //   name: "SNITCH AFRICA",
    //   URL: "https://www.snitchafrica.com/",
    //   info: "Snitch Africa is Africa's leading digital media platform. They are truth-seekers, content creators, and engineers who use cutting-edge technology to keep you informed about what's going on in Africa.",
    // },
  ];
  return (
    <div>
      {projectList.map(({ name, URL, info }, index) => (
        <ProjecCard
          projectName={name}
          projectURL={URL}
          projectInfo={info}
          projectIndex={index}
        />
      ))}
    </div>
  );
}
