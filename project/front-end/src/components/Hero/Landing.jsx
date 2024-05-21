
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="fixed inset-0 bg-no-repeat bg-cover opacity-70">
            <Image
              src='/colors.webp'
              alt="background"
              fill
            />
        </div>
        <div className="relative">
          <div className="z-10 relative">
            <h1 className="text-white text-5xl font-bold mb-4">Questify: Your next interview prep hub</h1>
            <p className="text-white text-lg">Ace your next interview with curated questions from industry experts.</p>
          </div>
        </div>
      </div>
    );
  }