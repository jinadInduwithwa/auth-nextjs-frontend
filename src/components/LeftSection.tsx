'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {descriptions} from '../constant/authentication';


interface LeftSectionProps {}

const LeftSection: React.FC<LeftSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative hidden lg:block lg:w-1/2 h-screen">
      <Image
        src="/images/background.jpg"
        alt="men and women in gym"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Heading and description */}
      <div className="absolute top-10 left-6 right-6 flex flex-col space-y-10 w-4/5 max-w-2xl">
        <div className=" relative w-10 h-10">
          <Image
            src="/images/logo.png"
            alt="men and women in gym"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h4 className="text-white font-bold text-4xl">{descriptions[currentIndex].title}</h4>
        <p className="text-white text-lg leading-tight">
          {descriptions[currentIndex].description}
        </p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 text-white text-sm leading-tight p-4">
        <p>Jinad Gamage</p>
        <p>CEO @ AlphaFlex</p>
      </div>
    </div>
  );
};

export default LeftSection;
