"use client"
import { useEffect, useState } from "react";
import Link from 'next/link'
import LogoCarousel from '@/components/Carousel/Carousel';

export default function SearchBar({ accessToken }) {
    const [companies, setCompanies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                const response = await fetch("http://cmsc508.com:8000/~24SP_manoja2/company/names", {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
    
                const data = await response.json();
                const companies = data.company_names; // Directly access the property from the parsed object
                setCompanies(companies);

            } catch (error) {
                console.error('Failed to fetch companies:', error);
            }
        };
        getAllCompanies();
    }, [accessToken]);

    const handleSearch = () => {
        const filtered = companies.filter(company => company.toLowerCase().includes(searchKeyword.toLowerCase()));
        setFilteredCompanies(filtered);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);
        if (value.trim() === '') {
            setFilteredCompanies([]);
        } else {
            handleSearch(value);
        }
    };

    return (
        <>
            <div className="h-screen w-screen flex flex-col items-center justify-center z-10">
                <div className="flex flex-col top-0 w-1/2 items-center justify-center absolute mt-52 ">
                    <span className="text-xl pb-8 font-bold text-white  p-3 rounded-lg shadow-xl">Find your company</span>
                    <div className="relative w-5/6">
                        <input 
                            className="font-bold rounded-full w-full py-3 pl-12 pr-3 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                            type="text" 
                            placeholder="Search"
                            value={searchKeyword} 
                            onChange={handleChange} 
                        />
                        <div className="absolute top-3 left-3">
                            <svg className="w-6 h-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="w-4/5 mt-4 z-10">
                        <ul className="bg-gray-300 text-black divide-y divide-gray-400">
                            {filteredCompanies.map((company, index) => (
                                <li key={index} className="p-2 hover:bg-gray-400 transition-colors">
                                    <Link href={`/position/${company}`} className="hover:text-sky-700">
                                        {company}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <LogoCarousel/>
            </div>
        </>
    );
}
