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
    <footer className="mt-1 mb-14 ml-4 space-y-6">
      {/* 09 */}
      <div className="flex items-start space-x-4">
        <div>
          <p className="text-base font-mono text-secondary">09</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">Credit</p>
          <h2 className="text-base mb-4 mt-2 text-secondary space-x-2">
            <span>By yours truly</span>
            <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/20 border-secondary/5 px-1 py-0.5 rounded-md">
              <Link
                href={`https://github.com/calebareeveso/calebareeveso.com`}
                target={`_blank`}
              >
                website code
              </Link>
            </span>
          </h2>
        </div>
      </div>

      {/* 10 */}
      <div className="flex items-start space-x-4">
        <div>
          <p className="text-base font-mono text-secondary">10</p>
        </div>
        {/*  */}
        <div className="space-y-1">
          <p className="text-base text-black">© 2024</p>
        </div>
      </div>
    </footer>
  );
}
