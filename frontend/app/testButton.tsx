'use client';
import Image from "next/image";
import React from "react";

export default function TestButton() {

  const [buttonText, setButtonText] = React.useState("TEST BUTTON");
  
  const fetchText = async () => {
    const response = await fetch("http://localhost:3001");
    const test = await response.text();
    setButtonText(test);
  };

  const onClick = () => {
    fetchText();
  };

  return (
    <>
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={onClick}
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        {buttonText}
      </button>
    </>
  );
}
