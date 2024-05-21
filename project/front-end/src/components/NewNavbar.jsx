"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react"


export default function Navbar(){
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
   
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 0) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`m-auto px-20 bg-black z-[9999] duration-500 text-[#9fd5e2] flex items-center justify-between fixed top-0 pt-5 left-0 w-screen h-20 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <span className="text-3xl font-bold">
                <div>questify</div>
            </span>
            <div className="space-x-8 hover:text-[#b5e0ec]">
              <a className="text-lg " href='/#signup'>
                  Sign Up
              </a>
              <Link className="text-lg cursor-pointer " href='/'>
                  Home
              </Link>
              <Link className="text-lg cursor-pointer" href='/login'>
                  Admin
              </Link>
              <Link className="text-lg cursor-pointer" href='/login'>
                  Login
              </Link>
            </div>

        </div>

    )

}