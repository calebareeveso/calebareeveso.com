import Link from "next/link";
import React from "react";

export default function Index(props) {
  return (
    <div>
      <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-6 sm:mb-8">
        Introduction
      </h3>
      <h2>
        Hi, I'm Caleb Areeveso, a{" "}
        <em className="font-medium text-primary">Computer Science</em> student
        From based in London with a passion for{" "}
        <em className="font-medium text-primary">software engineering.</em> I've
        enjoyed collaborating with startups on product development and design,
        turning innovative ideas into reality. I'm excited to connect and
        explore <em className="font-medium text-primary">new opportunities</em>{" "}
        to create and grow together!
      </h2>

      <br />
      <h3 className="text-base underline decoration-2 decoration-primary  decoration-dashed underline-offset-8 text-primary mb-6 sm:mb-8">
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
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>Github:{" "}
        <em className="font-medium text-primary">
          <Link href="https://github.com/calebareeveso" target={"_blank"}>
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
