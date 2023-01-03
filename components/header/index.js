import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Index(props) {
  return (
    <header className="mt-10 sm:mt-20">
      <div className="h-[2rem] w-[2rem] mb-2 sm:mb-3 sm:w-[2rem] sm:h-[2rem] -ml-1 relative">
        <Image
          src={"/static/images/calebareveso_avatar.png"}
          layout={"fill"}
          className=""
        />
      </div>
      <h1 className="text-base">
        {" "}
        {">"} CALEB AREEVESO <br /> [England, UK]
      </h1>
    </header>
  );
}
