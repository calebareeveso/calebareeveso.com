import Image from "next/image";
import Clock from "@/components/clock";

export default function Header() {
  return (
    <header className="mt-6 sm:mt-8 pt-4">
      <section className="flex flex-col gap-6">
        {/* 01 */}
        <div className="flex items-start gap-4">
          <div>
            <p className="text-base font-mono text-secondary">01</p>
          </div>
          <div className="gap-2 ">
            <p className="text-base text-black">Name</p>
            <h1 className="text-base text-secondary mt-2">Caleb Areeveso</h1>
          </div>
        </div>
        {/* 02 */}
        <div className="flex items-start gap-4">
          <div>
            <p className="text-base font-mono text-secondary">02</p>
          </div>
          <div className="gap-2">
            <p className="text-base text-black">Location</p>
            <h2 className="text-base mt-2 text-secondary">
              London, UK {`  `}
              <Clock />
            </h2>
          </div>
        </div>
        {/* 03 */}
        <div className="flex items-start gap-4">
          <div>
            <p className="text-base font-mono text-secondary">03</p>
          </div>
          <div className="gap-2 ">
            <p className="text-base text-black">Status</p>
            <h2 className="text-base mt-2 text-secondary">
              Google SWE Intern, CS undergrad
            </h2>
          </div>
        </div>
        {/* 04 */}
        <div className="flex items-start gap-4">
          <div>
            <p className="text-base font-mono text-secondary">04</p>
          </div>
          <div className="space-y-3 flex-grow">
            <p className="text-base text-black">Face Card</p>
            <div className="h-[20rem] w-full sm:w-full sm:h-[30rem] relative">
              <Image
                src="/static/images/me.jpeg"
                alt="Caleb Areeveso"
                fill
                sizes="(max-width: 640px) 100vw, 576px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
