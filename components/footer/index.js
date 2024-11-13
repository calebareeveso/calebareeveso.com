import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";
import Clock from "react-live-clock";
export default function Index(props) {
  const [PageLoad, setPageLoad] = useState(false);
  useEffect(() => {
    setPageLoad(true);
  }, []);

  return (
    <footer className="mt-10 mb-14 ml-4 ">
      {/* <h1 className="text-base underline decoration-2 decoration-primary decoration-dashed underline-offset-8 text-primary">
        BUILT BY CALEB AREEVESO
      </h1> */}
      <h2 className="text-base">
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>
        <Link
          href={`https://github.com/calebareeveso/calebareeveso.com`}
          target={`_blank`}
        >
          {" "}
          <em className="font-medium text-primary inline">
            code
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
              ></path>
            </svg>
          </em>
        </Link>
      </h2>
    </footer>
  );
}
