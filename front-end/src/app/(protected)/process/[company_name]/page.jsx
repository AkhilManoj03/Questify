import { requireUser } from '@/app/session.server';
import Processes from "@/components/Processes/Processes";

export default async function Page({ params }) {
  
  const { role, accessToken} = await requireUser();

  const companyName = params.company_name;

  return (
    <>
      <Processes companyName={companyName} accessToken={accessToken}/>
    </>
  )
}