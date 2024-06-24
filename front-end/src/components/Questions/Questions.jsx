'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function QuestionSearch({ companyName, accessToken }) {
    const searchParams = useSearchParams()
    const decodedCompanyName = decodeURIComponent(companyName);
    const position = searchParams.get('position')
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        async function fetchQuestions() {
            setLoading(true);
            setError(null);

            let url = `http://cmsc508.com:8000/~24SP_manoja2/question/${companyName}`;
            if (position) {
                url += `?position_name=${position}`;
            }
            console.log(url)
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                if (position){
                    const data = await response.json();
                    console.log(data)
                    const questions = data[decodedCompanyName][decodeURIComponent(position)].questions;
                    console.log(questions)
                    setQuestions(questions);

                }
                else {
                    const data = await response.json();
                    const questions = data[decodedCompanyName].questions;
                    setQuestions(questions);
                }

            } catch (error) {
                console.error('Failed to fetch processes:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [companyName, position, accessToken]);

    return (
        <div className="flex h-screen w-screen mt-40 justify-between">
            <div className=" flex items-center justify-center mb-20 inset-y-0 left-0 text-white w-1/2 ">
                <h1 className="text-2xl font-bold fixed">{position} at {decodedCompanyName}</h1>
            </div>
            <div className=" overflow-y-auto p-5 inset-y-0 left-0 w-1/2 mt-8">
                <p className='text-center text-2xl'>List of questions asked</p>
                {loading && <p className="text-center text-blue-500">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error.message}</p>}
                {questions.map((question, index) => (
                    <div key={index} className="  bg-blue-300 text-gray-800 p-6 w-full mb-4 rounded-lg shadow">
                        <p>{question}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}