import { requireUser } from '@/app/session.server';
import Questions from "@/components/Questions/Questions";

export default async function Page({ params }) {
  
  const { role, accessToken} = await requireUser();

  const companyName = params.company_name;

  return (
    <>
      <Questions companyName={companyName} accessToken={accessToken}/>
    </>
  )
}