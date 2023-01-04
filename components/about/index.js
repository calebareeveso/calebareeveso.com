import Link from "next/link";
import React from "react";

export default function Index(props) {
  return (
    <div>
      <h2>
        <b>Front-end Engineer</b> - Developing web-based software with a lot of
        depth and detail in terms of both visuals and functionality. By paying
        close attention to detail during the development process and making
        efficient use of front-end technology, I've been able to deliver an
        immersive and engaging experience for users.{" "}
        <u>
          <Link href="#projects">See my work</Link>
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
