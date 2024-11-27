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
    <header className="mt-6 sm:mt-8">
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
      <section className="space-y-6">
        {/* 01 */}
        <div className="flex items-start space-x-4">
          {/*  */}
          <div>
            <p className="text-base font-mono text-secondary">01</p>
          </div>
          {/*  */}
          <div className="space-y-1">
            <p className="text-base text-black">Name</p>
            <h1 className="text-base text-secondary">Caleb Areeveso</h1>
          </div>
        </div>
        {/* 02 */}
        <div className="flex items-start space-x-4">
          {/*  */}
          <div>
            <p className="text-base font-mono text-secondary">02</p>
          </div>
          {/*  */}
          <div className="space-y-1">
            <p className="text-base text-black">Location</p>
            <h2 className="text-base mb-4 mt-2 text-secondary">
              England, UK {` `}
              {PageLoad && (
                <span className="border-[1px] text-secondary/20 border-secondary/5 px-1 py-0.5 rounded-md">
                  <Clock
                    format={"h:mm:ss A"}
                    ticking={true}
                    timezone={"Europe/London"}
                  />
                </span>
              )}
            </h2>
          </div>
        </div>
        {/* 03 */}
        <div className="flex items-start space-x-4">
          {/*  */}
          <div>
            <p className="text-base font-mono text-secondary">03</p>
          </div>
          {/*  */}
          <div className="space-y-1">
            <p className="text-base text-black">Status</p>
            <h2 className="text-base mb-4 mt-2 text-secondary">CS undergrad</h2>
          </div>
        </div>
        {/* 04 */}
        <div className="flex items-start space-x-4">
          {/*  */}
          <div>
            <p className="text-base font-mono text-secondary">04</p>
          </div>
          {/*  */}
          <div className="space-y-3 flex-grow">
            <p className="text-base text-black">Face Card</p>
            <div className="h-[20rem] w-full sm:w-full  sm:h-[30rem] relative">
              <Image
                src={"/static/images/me.jpeg"}
                alt={"Caleb Areeveso"}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                placeholder="blur"
                blurDataURL={"/static/images/me.jpeg"}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
