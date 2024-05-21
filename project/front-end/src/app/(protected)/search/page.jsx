import { requireUser } from '@/app/session.server';
import LogoCarousel from '@/components/Carousel/Carousel';
import SearchBar from '@/components/Search/SearchBar';

export default async function SearchPage(){

    const { role, accessToken} = await requireUser();


    return(
        <>
        <div className='flex flex-col items-center justify-center'>
            <SearchBar accessToken={accessToken}/>
        </div>
        </>
        
    )
}