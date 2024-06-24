import AuthNavbar from '@/components/AuthNavbar';
import { Suspense } from 'react';
import Loading from './user/loading';
import Image from 'next/image';
import { requireUser } from '@/app/session.server';

export default async function PrivateLayout({
  children,
}) {
  const user = await requireUser();

  return (
    <div className='h-screen flex justify-center items-center'>
      <AuthNavbar/>
      <div>
        <Suspense fallback={<Loading/>}>
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="fixed inset-0 bg-no-repeat bg-cover opacity-35">
            <Image
              src='/sand.jpg'
              alt="background"
              fill
            />
          </div>
          <div className="relative">
            <div className="z-10 relative">
              {children}
            </div>
          </div>
        </div>
        </Suspense>
      </div>
    </div>
  );
}
