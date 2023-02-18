import Link from "next/link";
import React from "react";

export default function Index(props) {
  return (
    <div>
      <h1 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-4">
        Introduction
      </h1>
      <h2>
        Hi, I'm Caleb Areeveso, and I'm a college student from the UK with a
        passion for software engineering. From a young age, I've always been
        fascinated by technology and how it can be used to solve complex
        problems. As I've grown older, my interest in coding has only continued
        to grow, and I'm now dedicated to honing my skills and learning as much
        as I can about the field.
      </h2>
      <br />
      <h2>
        I love to take on new projects since they challenge me to improve and
        develop new skills. Here are some of my previous {` `}
        <u className="inline">
          <Link href="#projects">projects</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="inline"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </u>
      </h2>
      <br />
      <h3>
        Email me at{" "}
        <u>
          <b>
            <Link href="mailto:hello@calebareeveso.com">
              hello@calebareeveso.com
            </Link>
          </b>
        </u>{" "}
        if you want to buddy up [work on a project]. You can also find me on
        Twitter at{" "}
        <u>
          <b>
            <Link href="https://twitter.com/calebareeveso" target={"_blank"}>
              @calebareeveso.
            </Link>
          </b>
        </u>
      </h3>
    </div>
  );
}
