import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
import { useState } from "react";
export default function Index(props) {
  const [IsOpen, setIsOpen] = useState(false);
  // list of projects
  const projectList = [
    {
      name: "REVISIONROOM.LIVE",
      URL: "https://www.revisionroom.live",
      info: "A platform platform designed to bridge geographical and educational divides among students in England. It facilitates collaborative audio-based revision sessions, enabling students to learn from each other regardless of their backgrounds",
      ImageSource: "/static/images/revisionroom_live.jpeg",
    },
    {
      name: "EMBRACEMYWORLD.COM",
      URL: "https://www.embracemyworld.com",
      info: "A platform that is raising awareness on Autism, (ADHD), and Cerebral Palsy",
      ImageSource: "/static/images/embracemyworld.png",
    },
    {
      name: "QNA.CALEB.WORKS",
      URL: "https://qna.caleb.works/",
      info: "A web app that improves memory retention via active recall by enabling users to make custom Q&A collections, and its smart review system prompts users to revisit questions at specific intervals",
      ImageSource: "/static/images/qna.jpg",
    },
    {
      name: "REFACTOREDU.CO",
      URL: "https://www.refactoredu.co",
      info: "An open-source platform for sharing and discovering roadmaps built to guide student in their pursuit of education and growth in all (STEAM) fields",
      ImageSource: "/static/images/refactoredu.png",
    },
    {
      name: "SNITCHAFRICA.COM",
      URL: "https://www.snitchafrica.com",
      info: "A digital media platform built for Gen Z Africans",
      ImageSource: "/static/images/snitchafrica.png",
    },
    {
      name: "OVERCOMERSCOLUMBUS.COM",
      URL: "https://www.overcomerscolumbus.com",
      info: "A website for the Overcomers Christian Center, a church based in Columbus, Ohio, United States",
      ImageSource: "/static/images/overcomerscolumbus.png",
    },
  ];
  return (
    <div className=" relative" id="projects">
      <div className="flex justify-between ">
        <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-6 sm:mb-8">
          Projects
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-5 xs:gap-6 ">
        {projectList.map(({ name, URL, info, ImageSource }, index) => (
          <ProjecCard
            key={index}
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
