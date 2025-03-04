import React from "react";
import LazyImage from "../ui/LazyImage";
import clsx from "clsx";

import RedJellyImage from "../../assets/red-jelly.png";

interface LogoProps {
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ animated = false }) => {
  return (
    <div
      className={clsx(
        "shadow my-12 flex flex-col items-center justify-center gap-y-2 bg-gradient-to-r from-blue-600 to-violet-600 w-[175px] h-[175px] mx-auto rounded-full text-center font-extrabold font-[cursive] text-5xl tracking-widest py-4",
        animated ? "spin-x" : ""
      )}
    >
      <LazyImage src={RedJellyImage} width={100} height={85} />
    </div>
  );
};

export default Logo;
