import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
export default function Cards(props) {
  return (
    <div>
      {/* Card content */}
      <div className="flex space-x-2 items-end">
        <div className="grid grid-cols-1 gap-3 w-full h-full pb-6  border-secondary/5 sm:pb-5 border-b ">
          <Link
            href={props.projectURL}
            target={"_blank"}
            style={{ opacity: 1 }}
            className="flex items-center space-x-2 sm:text-[13px] text-[12px] xs:text-[12px]"
          >
            <span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13.5C8.72391 13.5 10.3772 12.8152 11.5962 11.5962C12.8152 10.3772 13.5 8.72391 13.5 7M7 13.5C5.27609 13.5 3.62279 12.8152 2.40381 11.5962C1.18482 10.3772 0.5 8.72391 0.5 7M7 13.5C8.50168 11.6533 9.3772 9.37699 9.5 7C9.3772 4.62301 8.50168 2.34665 7 0.5M7 13.5C5.49832 11.6533 4.6228 9.37699 4.5 7C4.6228 4.62301 5.49832 2.34665 7 0.5M13.5 7C13.5 5.27609 12.8152 3.62279 11.5962 2.40381C10.3772 1.18482 8.72391 0.5 7 0.5M13.5 7H0.5M7 0.5C5.27609 0.5 3.62279 1.18482 2.40381 2.40381C1.18482 3.62279 0.5 5.27609 0.5 7"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-medium text-primary leading-tight uppercase">
              {props.projectName}
            </span>
          </Link>
          <p className="sm:text-base text-secondary text-[12px] xs:text-sm ">
            {props.projectInfo}
          </p>
          {/* Card Image */}
          <div className="h-[20rem] w-full sm:w-full  sm:h-[36rem] relative">
            <Link
              href={props.projectURL}
              target={"_blank"}
              style={{ opacity: 1 }}
              className="flex space-x-1.5 sm:text-base text-[12px] xs:text-sm mt-0.5 sm:mt-0"
            >
              <Image
                src={props.projectImageSource}
                alt={props.projectName}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                placeholder="blur"
                blurDataURL={props.projectImageSource}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
