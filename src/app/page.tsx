import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-16">
      <h1 className="text-xl font-bold w-full text-center">Trading Journal</h1>
      <Image
        src="/"
        alt="Logo"
        height={300}
        width={300}
        className="rounded-full"
      />
      <Button>Get Started</Button>
    </div>
  );
};

export default Home;
