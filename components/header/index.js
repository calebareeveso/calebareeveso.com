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
    <header className="mt-10 sm:mt-20">
      {/* <div className="h-[2rem] w-[2rem] mb-2 sm:mb-3 sm:w-[2rem] sm:h-[2rem] relative">
        <Image
          src={"/static/images/calebareveso_avatar.png"}
          alt={"Caleb Areeveso"}
          layout={"fill"}
          placeholder="blur"
          blurDataURL={"/static/images/calebareveso_avatar.png"}
          priority
        />
      </div> */}
      <h1 className="text-base underline decoration-2 decoration-primary decoration-dashed underline-offset-8 text-primary">
        CALEB AREEVESO
      </h1>
      <h2 className="text-base my-4">
        <span className="mr-1 font-extrabold text-primary">{"*"}</span> England,
        UK {` `}
        {PageLoad && (
          <>
            [
            <Clock
              format={"h:mm:ss A"}
              ticking={true}
              timezone={"Europe/London"}
            />
            ]
          </>
        )}
      </h2>

      <div className="h-[20rem] w-full sm:w-full  sm:h-[36rem] relative">
        <Image
          src={"/static/images/me.png"}
          alt={"Caleb Areeveso"}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          placeholder="blur"
          blurDataURL={"/static/images/me.png"}
          priority
        />
      </div>
    </header>
  );
}
