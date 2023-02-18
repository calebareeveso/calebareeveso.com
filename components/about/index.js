import Link from "next/link";
import React from "react";

export default function Index(props) {
  return (
    <div>
      <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-4">
        Introduction
      </h3>
      <h2>
        Hi, I'm Caleb Areeveso, and I'm a college student from the UK with a
        passion for software engineering. From a young age, I've always been
        fascinated by technology and how it can be used to solve complex
        problems.
      </h2>
      <br />
      <h2>
        As I've grown older, my interest in coding has only continued to grow,
        and I'm now dedicated to honing my skills and learning as much as I can
        about the field.
      </h2>
      <br />
      <h2>
        I love to take on new projects since they challenge me to improve and
        develop new skills. Here are some of my previous {` `}
        <Link href="#projects">
          {" "}
          <em className="font-medium text-primary inline">
            projects
            <svg
              viewBox="0 0 11 10"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="ml-1 inline"
            >
              <path
                d="M10.0779 0.514719C10.0779 0.238774 9.85384 0.0150763 9.5775 0.0150763H5.07428C4.79794 0.0150763 4.57393 0.238774 4.57393 0.514719C4.57393 0.790664 4.79794 1.01436 5.07428 1.01436L9.07714 1.01436V5.0115C9.07714 5.28745 9.30116 5.51114 9.5775 5.51114C9.85384 5.51114 10.0779 5.28745 10.0779 5.0115V0.514719ZM1.43388 9.3533L9.9313 0.868019L9.22369 0.161418L0.726272 8.6467L1.43388 9.3533Z"
                fill="#111111"
                class="jsx-1567214789"
              ></path>
            </svg>
          </em>
        </Link>
      </h2>
      <br />
      <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-4">
        Contact
      </h3>
      <h2 className="text-base my-2">
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>Email:{" "}
        <em className="font-medium text-primary">
          <Link href="mailto:hello@calebareeveso.com?&subject=I%20want%20to%20buddy%20up!&body=Hello%20Caleb,%20Let's%20buddy%20up!">
            hello@calebareeveso.com
          </Link>
        </em>
      </h2>
      <h2 className="text-base my-2">
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>Twitter:{" "}
        <em className="font-medium text-primary">
          <Link href="https://twitter.com/calebareeveso" target={"_blank"}>
            @calebareeveso
          </Link>
        </em>
      </h2>
      <h2 className="text-base my-2">
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>
        Linkedin:{" "}
        <em className="font-medium text-primary">
          <Link
            href="https://www.linkedin.com/in/caleb-areeveso/"
            target={"_blank"}
          >
            @caleb-areeveso
          </Link>
        </em>
      </h2>
      <h3 className="mt-2">Reach out if you want to buddy up:)</h3>
    </div>
  );
}
