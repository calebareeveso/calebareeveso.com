import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
export default function Cards(props) {
  return (
    <div key={props.projectIndex}>
      {/* Card content */}
      <div className="flex space-x-2 items-start">
        <span className="mr-1 font-extrabold text-primary">{"* "}</span>
        <div className="grid grid-cols-1 gap-3 w-full h-full pb-2 border-secondaryGray sm:pb-5 border-b border-dashed">
          <Link
            href={props.projectURL}
            target={"_blank"}
            style={{ opacity: 1 }}
            className="flex space-x-1.5 sm:text-base text-[12px] xs:text-sm "
          >
            <em className="font-medium text-primary">{props.projectName}</em>
            <span>
              <svg
                viewBox="0 0 11 10"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="inline"
              >
                <path
                  d="M10.0779 0.514719C10.0779 0.238774 9.85384 0.0150763 9.5775 0.0150763H5.07428C4.79794 0.0150763 4.57393 0.238774 4.57393 0.514719C4.57393 0.790664 4.79794 1.01436 5.07428 1.01436L9.07714 1.01436V5.0115C9.07714 5.28745 9.30116 5.51114 9.5775 5.51114C9.85384 5.51114 10.0779 5.28745 10.0779 5.0115V0.514719ZM1.43388 9.3533L9.9313 0.868019L9.22369 0.161418L0.726272 8.6467L1.43388 9.3533Z"
                  fill="#111111"
                  className=""
                ></path>
              </svg>
            </span>
          </Link>
          {/* Card Image */}
          <div className="h-[20rem] w-full sm:w-full  sm:h-[36rem] relative">
            <Image
              src={props.projectImageSource}
              alt={props.projectName}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              placeholder="blur"
              blurDataURL={props.projectImageSource}
              priority
            />
          </div>
          <p className="sm:text-base text-[12px] xs:text-sm ">
            {props.projectInfo}
          </p>
        </div>
      </div>
    </div>
  );
}
