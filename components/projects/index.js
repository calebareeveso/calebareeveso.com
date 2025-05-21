import Link from "next/link";
import React from "react";
import ProjecCard from "./card";
import { useState } from "react";
export default function Index(props) {
  const [IsOpen, setIsOpen] = useState(false);
  // list of projects
  const projectList = [
    {
      name: "QUESTIONEE.AI",
      URL: "https://www.questionee.ai",
      info: "An AI writing partner that asks you questions and offers clear choices before writing.",
      ImageSource: "/static/images/questionee_ai.jpeg",
    },

    {
      name: "RETENTION AI",
      URL: "https://retentionai.app",
      info: "Retain More, Forget Less with RetentionAI",
      ImageSource: "/static/images/retentionai.jpeg",
    },

    {
      name: "EXPECT.CHAT",
      URL: "https://expect.chat",
      info: "Chat With Your Future Self To Check In On Your Expectations",
      ImageSource: "/static/images/expect.jpeg",
    },
    {
      name: "MAKE.GUIDE",
      URL: "https://www.make.guide",
      info: "Make valuable guides, help others learn, and earn from your knowledge — all in one place!",
      ImageSource: "/static/images/guide.jpeg",
    },
    {
      name: "revisionrooms.LIVE",
      URL: "https://www.revisionrooms.live",
      info: "An audio-based platform helping students in England learn together, overcoming geographical and educational gaps",
      ImageSource: "/static/images/revisionrooms_live.jpeg",
    },
    {
      name: "EMBRACEMYWORLD.COM",
      URL: "https://www.embracemyworld.com",
      info: "A platform that is raising awareness on Autism, (ADHD), and Cerebral Palsy",
      ImageSource: "/static/images/embracemyworld.png",
    },
    // {
    //   name: "SNITCHAFRICA.COM",
    //   URL: "https://www.snitchafrica.com",
    //   info: "A digital media platform built for Gen Z Africans",
    //   ImageSource: "/static/images/snitchafrica.png",
    // },
    // {
    //   name: "OVERCOMERSCOLUMBUS.COM",
    //   URL: "https://www.overcomerscolumbus.com",
    //   info: "A website for the Overcomers Christian Center, a church based in Columbus, Ohio, United States",
    //   ImageSource: "/static/images/overcomerscolumbus.png",
    // },
  ];
  return (
    <div className=" relative" id="projects">
      {/* 08 */}
      <div className="flex items-start space-x-4">
        {/*  */}
        <div>
          <p className="text-base font-mono text-secondary">08</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">My Hustles</p>
          <div className="grid grid-cols-1 gap-5 xs:gap-6 pt-2">
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
      </div>
    </div>
  );
}
