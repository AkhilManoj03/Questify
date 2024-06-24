import { requireUser } from '@/app/session.server';
import AdminProfile from '@/components/AdminProfile/AdminProfile';
import { redirect } from 'next/navigation'


export default async function AdminDashboard(){
    const { role, accessToken} = await requireUser();

    if (role === 'user'){
        redirect('/user')
    }

    return (
        <div className=" flex flex-col justify-center items-center text-gray-100">
            <AdminProfile accessToken={accessToken}/>
        </div>
    )
}