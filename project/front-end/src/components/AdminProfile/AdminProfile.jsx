'use client';

import { useEffect, useState } from "react"
import Modal from "./Modal/Modal";

export default function AdminProfile({accessToken}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [students, setStudents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);
    const [userCompanies, setUserCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('users');
    const [userUpdates, setUserUpdates] = useState({});
    const [studentUpdates, setStudentUpdates] = useState({});
    const [employeeUpdates, setEmployeeUpdates] = useState({});
    const [companyUpdates, setCompanyUpdates] = useState({});
    const [positionUpdates, setPositionUpdates] = useState({});
    const [processUpdates, setProcessUpdates] = useState({});

    const handleUserChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index] = { ...updatedUsers[index], [field]: value };
        setUserUpdates(updatedUsers);
        setUsers(updatedUsers);
    };

    const handleStudentChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index] = { ...updatedStudents[index], [field]: value };
        setStudentUpdates(updatedStudents);
        setStudents(updatedStudents);
    };

    const handleEmployeeChange = (index, field, value) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index] = { ...updatedEmployees[index], [field]: value };
        setEmployeeUpdates(updatedEmployees);
        setEmployees(updatedEmployees);
    };

    const handleCompanyChange = (index, field, value) => {
        const updatedCompany = [...companies];
        updatedCompany[index] = { ...updatedCompany[index], [field]: value };
        setCompanyUpdates(updatedCompany);
        setCompanies(updatedCompany);
    };

    const handlePositionChange = (index, field, value) => {
        const updatedPosition = [...positions];
        updatedPosition[index] = { ...updatedPosition[index], [field]: value };
        setPositionUpdates(updatedPosition);
        setPositions(updatedPosition);
    };

    const handleProcessChange = (index, field, value) => {
        const updatedProcess = [...processes];
        updatedProcess[index] = { ...updatedProcess[index], [field]: value };
        setProcessUpdates(updatedProcess);
        setProcesses(updatedProcess);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/user/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setUsers(data.users);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/employee/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setEmployees(data.employees);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/student/all', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setStudents(data.students);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/company', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch company data');
                }
                const data = await res.json();
                setCompanies(data.companies);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch company data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/position', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch position data');
                }
                const data = await res.json();
                setPositions(data.positions);
                console.log(data.positions);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch position data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/process', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch process data');
                }
                const data = await res.json();
                setProcesses(data.processes);
                console.log(data.processes);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch process data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/question', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch question data');
                }
                const data = await res.json();
                setQuestions(data.questions);
                console.log(data.questions);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch question data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/user_questions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user favorites data');
                }
                const data = await res.json();
                setUserQuestions(data.user_questions);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user favories data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            try {
                const res = await fetch('http://cmsc508.com:8000/~24SP_manoja2/all/user_companies', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user company favorites data');
                }
                const data = await res.json();
                setUserCompanies(data.user_companies);
                setIsLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error('Failed to fetch user company favorites data:', error);
                setError(error);
                setIsLoading(false); // Stop loading if there is an error
            }
        };

        fetchData();
    }, [accessToken]);

    const submitUserUpdates = async (user) => {
        const { type, ...userWithoutType } = user;
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(userWithoutType)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('User information updated!')
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const submitStudentUpdates = async (user) => {
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/student/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('Student information updated!')
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };


    const submitEmployeeUpdates = async (user) => {
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/employee/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('Employee information updated!')
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const submitCompanyUpdates = async (company) => {
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/company/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(company)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('Company information updated!')
        } catch (error) {
            console.error('Failed to update company:', error);
        }
    };

    const submitPositionsUpdate = async (position) => {
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/positions/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(position)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('Position information updated!')
        } catch (error) {
            console.error('Failed to update Position:', error);
        }
    };

    const submitProcessUpdates = async (process) => {
        try {
            const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/process/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(process)
            });
            const data = await response.json();
            console.log(data); // Log the response from the server
            alert('Process information updated!')
        } catch (error) {
            console.error('Failed to update Process:', error);
        }
    };

    const deleteUser = async(email) => {
        try{
            const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/users/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (!response.ok){
                throw new Error ("Failed to delete")
            }
            const data = await response.json();
            console.log(data.message); // Log the success message
            alert('User deleted successfully');
            setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
            setStudents(prevStudents => prevStudents.filter(student => student.email !== email));
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.email !== email));

        } catch (error){
            console.error("Failed to delete: ", error);
        }
    }

    const deleteStudent = async(email) => {
        try{
            const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/student/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (!response.ok){
                throw new Error ("Failed to delete")
            }
            const data = await response.json();
            console.log(data.message); // Log the success message
            alert('Student deleted successfully');
            setStudents(prevStudents => prevStudents.filter(student => student.email !== email));

        } catch (error){
            console.error("Failed to delete: ", error);
        }
    }

    const deleteEmployee = async(email) => {
        try{
            const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/employee/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (!response.ok){
                throw new Error ("Failed to delete")
            }
            const data = await response.json();
            console.log(data.message); // Log the success message
            alert('Employee deleted successfully');
            setEmployees(prevEmployees => prevEmployees.filter(employee => employee.email !== email));

        } catch (error){
            console.error("Failed to delete: ", error);
        }
    }

    const deleteCompany = async(company_id) => {
        try{
            const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/company/${company_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })

            if (!response.ok){
                throw new Error ("Failed to delete")
            }
            const data = await response.json();
            console.log(data.message); // Log the success message
            alert('Company deleted successfully');
            setCompanies(prevCompanies => prevCompanies.filter(companies => companies.company_id !== company_id));

        } catch (error){
            console.error("Failed to delete: ", error);
        }
    }


    const deletePosition = async(position) => {
        const theBody = {
            company_id: position.company_id,
            position_name: position.name
        }
        try{
            const response = await fetch(`http://cmsc508.com:8000/~24SP_manoja2/position`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(theBody)
            })

            if (!response.ok){
                throw new Error ("Failed to delete")
            }
            const data = await response.json();
            console.log(data.message); // Log the success message
            alert('Position deleted successfully');

        } catch (error){
            alert("Failed to delete: ", error);
        }
    }


    if (isLoading) {
        return  (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
//${activeTab === 'users' ? 'mt-[800px]' : 'mt-[100px]'}
    return (
        <>
        
        <div className="flex flex-col">
        <div className={`bg-black h-36 flex items-end w-screen fixed top-0`}>
            <div className="flex space-x-4 border-b p-4">
                <button
                    className={`py-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-blue-500 top' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'employees' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('employees')}
                >
                    Employees
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'students' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('students')}
                >
                    Students
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'companies' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('companies')}
                >
                    Companies
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'positions' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('positions')}
                >
                    Positions
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'process' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('process')}
                >
                    Processes
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'questions' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('questions')}
                >
                    Questions
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'User Questions' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('User Questions')}
                >
                    User Questions
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === 'User Companies' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setActiveTab('User Companies')}
                >
                    User Companies
                </button>
            </div>
        </div>
        <div className={`top-0 px-24 ${activeTab === 'users' ? 'mt-[600px]' : ''}`}>
            {activeTab === 'users' && (
                <div>
                    <div className="flex w-full justify-end items-end">
                    <button className="flex bg-green-600 p-2 rounded-md justify-end items-end" onClick={() => setModalOpen(true)}>
                        Create User
                    </button>
                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                </div>
                <div className="grid grid-cols-8 gap-4 space-x-12 mb-2 text-gray-300 ">
                    <span className="font-semibold">Emails</span>
                    <span className="font-semibold">First Name</span>
                    <span className="font-semibold">Last Name</span>
                    <span className="font-semibold">University</span>
                    <span className="font-semibold">Phone Number</span>
                    <span className="font-semibold">User Type</span>
                </div>
                {users.map((user, index) => (
                    <div key={index} className="grid grid-cols-8 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={user.email} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <input 
                        value={user.first_name} 
                        onChange={(e) => handleUserChange(index, 'first_name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <input 
                        value={user.last_name} 
                        onChange={(e) => handleUserChange(index, 'last_name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <input 
                        value={user.university} 
                        onChange={(e) => handleUserChange(index, 'university', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <input 
                        value={user.phone_number} 
                        onChange={(e) => handleUserChange(index, 'phone_number', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <input 
                        value={user.type} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        <button className="p-2 bg-blue-500 rounded-md" onClick={() => submitUserUpdates(user)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteUser(user.email)}>Delete</button>
                    </div>
                ))}
                </div>
            )}
            {activeTab === 'employees' && (
                <div>
                <div className="grid grid-cols-5 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Email address</span>
                    <span className="font-semibold">Position Name</span>
                    <span className="font-semibold">Company ID</span>
                </div>
                {employees.map((employee, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={employee.email} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={employee.position_name} 
                        onChange={(e) => handleEmployeeChange(index, 'position_name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={employee.company_id} 
                        onChange={(e) => handleEmployeeChange(index, 'company_id', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-2 bg-blue-500 rounded-md" onClick={() => submitEmployeeUpdates(employee)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteEmployee(employee.email)}>Delete</button>
                    </div>
                ))}
                </div>

            )}
            {activeTab === 'students' && (
                <div>
                <div className="grid grid-cols-4 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Email address</span>
                    <span className="font-semibold">Class Year</span>
                    <span className="font-semibold">Major</span>
                </div>
                {students.map((student, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={student.email} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={student.class_year} 
                        onChange={(e) => handleStudentChange(index, 'class_year', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={student.major} 
                        onChange={(e) => handleStudentChange(index, 'major', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" onClick={() => submitStudentUpdates(student)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md" onClick={() => deleteStudent(student.email)}>Delete</button>
                    </div>
                ))}
                </div>
            )}
            {activeTab === 'companies' && (
                <div className='mt-[400px]'>
                <div className="grid grid-cols-4 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Company ID</span>
                    <span className="font-semibold">Company Name</span>
                    <span className="font-semibold">About</span>
                </div>
                {companies.map((company, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={company.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={company.name} 
                        onChange={(e) => handleCompanyChange(index, 'name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={company.about} 
                        onChange={(e) => handleCompanyChange(index, 'about', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" onClick={() => submitCompanyUpdates(company)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md" onClick={()=>deleteCompany(company.company_id)}>Delete</button>
                    </div>
                ))}
                </div>
                    
            )}
            {activeTab === 'positions' && (
                <div className='mt-[3600px]'>
                <div className="grid grid-cols-6 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Company ID</span>
                    <span className="font-semibold">Name</span>
                    <span className="font-semibold">Description</span>
                    <span className="font-semibold">Salary</span>
                </div>
                {positions.map((position, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={position.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={position.name} 
                        onChange={(e) => handlePositionChange(index, 'name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={position.description} 
                        onChange={(e) => handlePositionChange(index, 'description', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={position.salary} 
                        onChange={(e) => handlePositionChange(index, 'salary', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" onClick={() => submitPositionsUpdate(position)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md">Delete</button>
                    </div>
                ))}
                </div>
                    
            )}
            {activeTab === 'process' && (
                <div className='mt-[2500px]'>
                <div className="grid grid-cols-6 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">ID</span>
                    <span className="font-semibold">Company ID</span>
                    <span className="font-semibold">Position Name</span>
                    <span className="font-semibold">Process Text</span>
                </div>
                {processes.map((process, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={process.id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={process.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={process.position_name} 
                        onChange={(e) => handleProcessChange(index, 'position_name', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={process.process_text} 
                        onChange={(e) => handleProcessChange(index, 'process_text', e.target.value)}
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" onClick={() => submitProcessUpdates(process)}>Update</button>
                        <button className="p-1 bg-red-700 rounded-md">Delete</button>
                    </div>
                ))}
                </div>
                    
            )}
            {activeTab === 'questions' && (
                <div className='mt-[3500px]'>
                <div className="grid grid-cols-6 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">ID</span>
                    <span className="font-semibold">Company ID</span>
                    <span className="font-semibold">Position Name</span>
                    <span className="font-semibold">Process Text</span>
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={question.id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={question.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={question.position_name} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input value={question.process_text} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md">Update</button>
                        <button className="p-1 bg-red-700 rounded-md">Delete</button>
                    </div>
                ))}
                </div>
                    
            )}
            {activeTab === 'User Questions' && (
                <div className='mt-[100px]'>
                <div className="grid grid-cols-4 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Question ID</span>
                    <span className="font-semibold">User Email</span>
                </div>
                {userQuestions.map((userQuestion, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={userQuestion.question_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={userQuestion.user_email} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" >Update</button>
                        <button className="p-1 bg-red-700 rounded-md">Delete</button>
                    </div>
                ))}
                </div>   
            )}
            {activeTab === 'User Companies' && (
                <div className='mt-[200px]'>
                <div className="grid grid-cols-4 gap-4 space-x-12 mb-2 text-gray-300">
                    <span className="font-semibold">Company ID</span>
                    <span className="font-semibold">User Email</span>
                </div>
                {userCompanies.map((userCompany, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 space-x-12 py-3 border-b border-gray-700 whitespace-nowrap">
                        <input 
                        value={userCompany.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <input 
                        value={userCompany.company_id} 
                        readOnly
                        className="mt-1 block w-full py-1 px-2 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button className="p-1 bg-blue-500 rounded-md" >Update</button>
                        <button className="p-1 bg-red-700 rounded-md">Delete</button>
                    </div>
                ))}
                </div>   
            )}
        </div>
    </div>
    </>
    )
}
    