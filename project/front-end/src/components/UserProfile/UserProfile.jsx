"use client"
import { useEffect, useState } from "react"

export default function UserProfile({accessToken}){
    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        university: '',
        phone_number: '',
        type: '',
        class_year: '',
        major:'',
        company_name:'',
        position_name:'',
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/user_info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await res.json();
                setUser(data);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };
    
        fetchData();
    }, [accessToken]);
    


    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(user)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();
            console.log(result.message); // Or handle the response as needed
            setError(null);
            setSuccess(true);
        } catch (error) {
            console.error('Failed to update user:', error);
            setError(error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-gray-100 px-4">
            <h1 className="text-3xl font-bold mb-6 mt-10 text-gray-200">Edit Your Information</h1>
            {error && <p className="text-red-500 mb-8">Error: {error.message}</p>}
            {success && <p className='text-green-500 text-center mb-8'>Your information has been updated</p>}
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="pr-4">Loading your information</div>
                    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                <form className="w-full max-w-4xl space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2 mb-2">
                            <label htmlFor="first_name" className="block text-lg font-medium text-gray-300">First Name</label>
                            <input
                                id="first_name"
                                className="mt-1 block w-full py-2 px-3 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-2">
                            <label htmlFor="last_name" className="block text-lg font-medium text-gray-300">Last Name</label>
                            <input
                                id="last_name"
                                className="mt-1 block w-full py-2 px-3 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                    <label htmlFor="university" className="block text-lg font-medium text-gray-300">University</label>
                    <input
                        id="university"
                        className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        type="text"
                        name="university"
                        value={user.university}
                        onChange={handleChange}
                        placeholder="Enter your university"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone_number" className="block text-lg font-medium text-gray-300">Phone Number</label>
                    <input
                        id="phone_number"
                        className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        type="text"
                        name="phone_number"
                        value={user.phone_number}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                {user.type === 'student' && (
                    <>
                        <div>
                            <label htmlFor="class_year" className="block text-lg font-medium text-gray-300">Class Year</label>
                            <input
                                id="class_year"
                                className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="class_year"
                                value={user.class_year}
                                onChange={handleChange}
                                placeholder="Enter your class year"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="major" className="block text-lg font-medium text-gray-300">Major</label>
                            <input
                                id="major"
                                className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="major"
                                value={user.major}
                                onChange={handleChange}
                                placeholder="Enter your major"
                                required
                            />
                        </div>
                    </>
                )}
                {user.type === 'employee' && (
                    <>
                        <div>
                            <label htmlFor="company_name" className="block text-lg font-medium text-gray-300">Company Name</label>
                            <input
                                id="company_name"
                                className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="company_name"
                                value={user.company_name}
                                onChange={handleChange}
                                placeholder="Enter your company name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="position_name" className="block text-lg font-medium text-gray-300">Position Name</label>
                            <input
                                id="position_name"
                                className="mt-1 block w-full py-2 px-2 text-lg bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                type="text"
                                name="position_name"
                                value={user.position_name}
                                onChange={handleChange}
                                placeholder="Enter your position name"
                                required
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className="w-full py-3 mt-6 mb-0 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg text-white font-semibold focus:outline-none"
                    disabled={isSubmitting}
                    
                >
                    Update
                </button>
            </form>
            )}
        </div>
    );
    
    

}