import Link from "next/link";
import React from "react";

export default function Index(props) {
  return (
    <div className="space-y-6">
      {/* 05 */}
      <div className="flex items-start space-x-4">
        {/*  */}
        <div>
          <p className="text-base font-mono text-secondary">05</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">Bio</p>
          <h2 className="text-base mb-4 mt-2 text-secondary">
            Passionate about collaborating on product development and design,
            bringing innovative ideas to life. Excited to connect and explore!
          </h2>
        </div>
      </div>
      {/* 06 */}
      <div className="flex items-start space-x-4">
        {/*  */}
        <div>
          <p className="text-base font-mono text-secondary">06</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">Stalk Me</p>
          <div className="">
            <h2 className="text-base mb-3 mt-2 text-secondary space-x-2 flex items-center">
              <span>x / twitter</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/20 border-secondary/5 px-1 py-0  -mt-0.5  rounded-md">
                <Link href="https://x.com/calebareeveso" target={"_blank"}>
                  @calebareeveso
                </Link>
              </span>
            </h2>
            <h2 className="text-base mb-3 mt-2 text-secondary space-x-2 flex items-center">
              <span>Linkedin</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/20 border-secondary/5 px-1 py-0  -mt-0.5  rounded-md">
                <Link
                  href="https://www.linkedin.com/in/caleb-areeveso/"
                  target={"_blank"}
                >
                  @caleb-areeveso
                </Link>
              </span>
            </h2>
            <h2 className="text-base mb-0 mt-2 text-secondary space-x-2 flex items-center">
              <span>Github</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/20 border-secondary/5 px-1 py-0 -mt-0.5 rounded-md">
                <Link href="https://github.com/calebareeveso" target={"_blank"}>
                  @calebareeveso
                </Link>
              </span>
            </h2>
          </div>
        </div>
      </div>
      {/* 07 */}
      <div className="flex items-start space-x-4">
        <div>
          <p className="text-base font-mono text-secondary">07</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">Contact</p>
          <h2 className="text-base mb-4 mt-2 text-secondary space-x-2">
            <span>Email</span>
            <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/20 border-secondary/5 px-1 py-0.5 rounded-md">
              <Link href="mailto:hello@calebareeveso.com?&subject=I%20want%20to%20buddy%20up!&body=Hello%20Caleb,%20Let's%20buddy%20up!">
                hello@calebareeveso.com
              </Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
