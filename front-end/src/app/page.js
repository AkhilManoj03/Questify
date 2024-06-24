import Image from "next/image";
import SignUpSection from "@/components/SignUpSection/SignUpSection";
import Landing from "@/components/Hero/Landing";

export default function Home() {
  return (
    <>
    <Landing/>
    <main className="flex min-h-screen">
      
      <div className="w-screen items-center justify-center flex" id='signup'>
        <SignUpSection/>
      </div>
    </main>
    </>
  );
}
