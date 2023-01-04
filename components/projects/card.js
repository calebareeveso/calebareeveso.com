import Link from "next/link";
import React from "react";

export default function Cards(props) {
  const cardIndex0 =
    "transition ease-in-out duration-300 z-40 scale-[1]  border-secondaryGray border flex bg-primaryGray rounded-md overflow-hidden";
  const cardIndex1 =
    "transition ease-in-out duration-300 absolute top-[36%] sm:top-[33%] blur-[0.5px] z-30 scale-[0.9] border-secondaryGray border flex bg-primaryGray rounded-md overflow-hidden ";

  const cardIndex2 =
    "transition ease-in-out duration-300 absolute top-[45%] z-20 blur-[1px] scale-[0.8] border-secondaryGray border flex bg-primaryGray rounded-md overflow-hidden";

  const cardIndex3 =
    "transition ease-in-out duration-300 absolute top-[55%] z-15 blur-[2px] scale-[0.7] border-secondaryGray border flex bg-primaryGray rounded-md overflow-hidden";

  return (
    <div
      className={
        props.projectIndex == 0 && props.projectIsOpen === false
          ? cardIndex0
          : props.projectIndex == 1 && props.projectIsOpen === false
          ? cardIndex1
          : props.projectIndex == 2 && props.projectIsOpen === false
          ? cardIndex2
          : props.projectIndex == 3 && props.projectIsOpen === false
          ? cardIndex3
          : cardIndex0
      }
      key={props.projectIndex}
    >
      {/* Card Image */}
      <div
        className="w-2/4 bg-cover bg-no-repeat border-r border-secondaryGray bg-center"
        style={{
          backgroundImage: `url(${props.projectImageSource})`,
        }}
        title="Caleb Areeveso Project"
      ></div>
      {/* Card content */}
      <div className="grid grid-cols-1 gap-1 w-full h-full py-2 px-3 sm:p-4">
        <h5 className="sm:text-base text-[12px] xs:text-sm">
          <b>{props.projectName}</b>
        </h5>
        <p className="sm:text-base text-[12px] xs:text-sm line-clamp-2">
          {props.projectInfo}
        </p>

        <b>
          <Link
            href={props.projectURL}
            target={"_blank"}
            style={{ opacity: `${props.projectIsOpen !== true ? 0.2 : 1}` }}
            className="flex space-x-1 sm:text-base text-[12px] xs:text-sm "
          >
            <span>LIVE SITE </span>
            <span>
              <svg
                className="-mb-1"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3095 12.8571C13.3095 13.1333 13.5334 13.3571 13.8095 13.3571C14.0857 13.3571 14.3095 13.1333 14.3095 12.8571H13.3095ZM13.8095 6.19048H14.3095C14.3095 5.91433 14.0857 5.69048 13.8095 5.69048V6.19048ZM7.14285 5.69048C6.86671 5.69048 6.64285 5.91433 6.64285 6.19048C6.64285 6.46662 6.86671 6.69048 7.14285 6.69048V5.69048ZM5.83692 13.456C5.64166 13.6512 5.64166 13.9678 5.83692 14.1631C6.03218 14.3583 6.34877 14.3583 6.54403 14.1631L5.83692 13.456ZM-232.411 -97.0417H260.411V-98.0417H-232.411V-97.0417ZM260.411 -97.0417C262.417 -97.0417 264.041 -95.4181 264.041 -93.4167H265.041C265.041 -95.9715 262.968 -98.0417 260.411 -98.0417V-97.0417ZM264.041 -93.4167V62.4167H265.041V-93.4167H264.041ZM264.041 62.4167C264.041 64.4181 262.417 66.0417 260.411 66.0417V67.0417C262.968 67.0417 265.041 64.9715 265.041 62.4167H264.041ZM260.411 66.0417H-232.411V67.0417H260.411V66.0417ZM-232.411 66.0417C-234.417 66.0417 -236.041 64.4181 -236.041 62.4167H-237.041C-237.041 64.9715 -234.968 67.0417 -232.411 67.0417V66.0417ZM-236.041 62.4167V-93.4167H-237.041V62.4167H-236.041ZM-236.041 -93.4167C-236.041 -95.4181 -234.417 -97.0417 -232.411 -97.0417V-98.0417C-234.968 -98.0417 -237.041 -95.9715 -237.041 -93.4167H-236.041ZM14.3095 12.8571V6.19048H13.3095V12.8571H14.3095ZM13.8095 5.69048H7.14285V6.69048H13.8095V5.69048ZM13.456 5.83692L5.83692 13.456L6.54403 14.1631L14.1631 6.54403L13.456 5.83692Z"
                  fill="black"
                />
              </svg>
            </span>
          </Link>
        </b>
      </div>
    </div>
  );
}
