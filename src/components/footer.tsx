import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-1 mb-14 ml-4 flex flex-col gap-6">
      {/* 10 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">10</p>
        </div>
        <div className="gap-2 ">
          <p className="text-base text-black">Credit</p>
          <h2 className="text-base mt-2 text-secondary gap-2">
            <span>By yours truly </span>
            <span className="hover:text-primary duration-300 transition-colors border-[1px] text-secondary/60 border-secondary/10 px-1 py-0.5 rounded-md">
              <Link
                href="https://github.com/calebareeveso/calebareeveso.com"
                target="_blank"
              >
                website code
              </Link>
            </span>
          </h2>
        </div>
      </div>

      {/* 11 */}
      <div className="flex items-start gap-4">
        <div>
          <p className="text-base font-mono text-secondary">11</p>
        </div>
        <div className="gap-2 ">
          <p className="text-base text-black">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
