import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-6">
      {/* 05 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">05</p>
        </div>
        <div className="gap-2 ">
          <p className="text-base text-black">Bio</p>
          <h2 className="text-base mt-2 text-secondary">
            I&apos;m building with AndroidX AppFunctions at Google for summer
            2026 and exploring how AI agents can safely integrate with it.
          </h2>
        </div>
      </div>
      {/* 06 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">06</p>
        </div>
        <div className="gap-1  flex flex-col">
          <p className="text-base text-black">Stalk Me</p>
          <div className="">
            <h2 className="text-base mb-3 mt-2 text-secondary gap-2 flex items-center">
              <span>x / twitter</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0 -mt-0.5 rounded-md">
                <Link href="https://x.com/calebareeveso" target="_blank">
                  @calebareeveso
                </Link>
              </span>
            </h2>
            <h2 className="text-base mb-3 mt-2 text-secondary gap-2 flex items-center">
              <span>Linkedin</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0 -mt-0.5 rounded-md">
                <Link
                  href="https://www.linkedin.com/in/caleb-areeveso/"
                  target="_blank"
                >
                  @caleb-areeveso
                </Link>
              </span>
            </h2>
            <h2 className="text-base mb-0 mt-2 text-secondary gap-2 flex items-center">
              <span>Github</span>
              <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0 -mt-0.5 rounded-md">
                <Link href="https://github.com/calebareeveso" target="_blank">
                  @calebareeveso
                </Link>
              </span>
            </h2>
          </div>
        </div>
      </div>
      {/* 07 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">07</p>
        </div>
        <div className="gap-2 ">
          <p className="text-base text-black">Contact</p>
          <h2 className="text-base mt-2 text-secondary flex items-center gap-2">
            <span>Email</span>
            <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0.5 rounded-md">
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
