// components/LogoCarousel.js
import Image from "next/image";

export default function LogoCarousel() {
  const logos = [
    '/Bank_of_America-Logo.wine.png',
    '/markel.png',
    '/Meta-Logo.png',
  ];

  return (
    <div x-data="{}"
    x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })" className="w-full h-1/3 mt-96 inline-flex flex-nowrap bg-white ">
       <div class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll space-x-12">
        <Image src='/Meta-Logo.png' width={300} height={300}/>
        <Image src='/Bank_of_America-Logo.wine.png' width={500} height={500}/>
        <Image src='/Google.png' width={200} height={200}/>   
        <Image src='/Markel.png' width={150} height={150}/>   
        <Image src='/Capital-One.webp' width={400} height={400}/>  
        <Image src='/Costar.png' width={200} height={200}/>  
        <Image src='/Microsoft.webp' width={200} height={200}/>  

        </div>
        <div class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll space-x-12 ml-9" aria-hidden="true">
            <Image src='/Meta-Logo.png' width={300} height={300}/>
            <Image src='/Bank_of_America-Logo.wine.png' width={500} height={500}/>    
            <Image src='/Google.png' width={200} height={200}/> 
            <Image src='/Markel.png' width={150} height={150}/>   
            <Image src='/Capital-One.webp' width={400} height={400}/>  
            <Image src='/Costar.png' width={200} height={200}/>  
            <Image src='/Microsoft.webp' width={200} height={200}/>  

        </div>
    </div>
  );
}
