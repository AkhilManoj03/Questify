
import Image from "next/image";
import Register from "./Register";

export default function Landing() {
    return (
        <div className="bg-black w-screen">
          <div className="z-10 relative flex w-screen justify-center">
            <Register/>
          </div>
        </div>

    );
  }