import { requireUser } from '@/app/session.server';
import Positions from "@/components/Positions/Positions";

export default async function Page({ params }) {
  
  const { role, accessToken} = await requireUser();

  const companyName = params.company_name;

  return (
    <>
      <Positions companyName={companyName} accessToken={accessToken}/>
    </>
  )
}