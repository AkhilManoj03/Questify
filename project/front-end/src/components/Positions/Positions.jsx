'use client'
import { useState, useEffect } from "react"
import Link from 'next/link'

export default function Positions({ companyName, accessToken }) {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        if (!companyName) return; // Exit if companyName is not yet available

        const fetchPositions = async () => {
            try {
                const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/position/${companyName}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch positions');
                }

                const data = await response.json();
                setPositions(data); // Assuming the API returns an array of positions
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };

        fetchPositions();
    }, [companyName, accessToken]);

    const decodedCompanyName = decodeURIComponent(companyName);

    return (
        <div className="min-h-screen p-10 mt-52">
            <h1 className={`text-3xl font-bold text-center mb-10 ${decodedCompanyName === 'Markel' && 'mt-14'}`}>Positions at {decodedCompanyName}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positions.map((position, index) => (
                    <div key={index} className=" bg-blue-950 hover:bg-blue-900 rounded-lg shadow-lg p-8">
                        <h2 className="text-lg w-full mx-auto text-slate-300 font-semibold mb-8">{position}</h2>
                        <div className="flex flex-col w-auto justify-between items-center mt-4 gap-5">
                            <Link href={`/process/${companyName}?position=${position}`}>
                                <div className="text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out">Interview Process</div>
                            </Link>
                            <Link href={`/question/${companyName}?position=${position}`}>
                                <div className="text-blue-300 hover:text-blue-700 transition duration-300 ease-in-out">Interview Questions</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  }