import { requireUser } from '@/app/session.server';
import UserProfile from '@/components/UserProfile/UserProfile'
import { Suspense } from 'react';
import Loading from './loading';


export default async function User(){
    const { role, accessToken} = await requireUser();

    return (
        <Suspense fallback={<Loading />}>
            <UserProfile accessToken={accessToken}/>
        </Suspense>
    )
}