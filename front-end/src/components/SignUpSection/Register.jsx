'use client'
import { useState } from 'react';

export default function SignUpForm() {
  const [userType, setUserType] = useState('');
  const [success, setSuccessType] = useState(false);


  const handleSubmit = async(event) =>{
    event.preventDefault()

    const formData = {
      email: event.target.email_address.value,
      university: event.target.university.value,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      password: event.target.password.value,
      phone_number: event.target.phone_number.value,
      type: userType,
      class_year: userType === 'student' ? event.target.class_year.value : undefined,
      major: userType === 'student' ? event.target.major.value : undefined,
      company_name: userType === 'employee' ? event.target.class_year.value : undefined, 
      position_name: userType === 'employee' ? event.target.major.value : undefined
    };

    try {
      const response = await fetch('http://cmsc508.com:8000/~24SP_manoja2/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log(responseData);
      setSuccessType(true);
    } catch (error) {
      console.error('Failed to send POST request:', error);
    }
  }

  const StudentFields = () => (
    <div className="grid grid-cols-2 gap-4 pb-2">
    <div>
      <label className="text-md font-medium text-gray-400">Graduation Year</label>
      <input type="text" id="class_year" name="class_year" className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " required/>
    </div>
    <div>
      <label className="text-md font-medium text-gray-400">Major</label>
      <input type="text" id="major" name="major" className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " required/>
    </div>
  </div>
  )

  const EmployeeFields = () => (
    <div className="grid grid-cols-2 gap-4 pb-2">
      <div>
        <label className="text-md font-medium text-gray-400">Company Name</label>
        <input type="text" id="class_year" name="class_year" className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " required/>
      </div>
      <div>
        <label className="text-md font-medium text-gray-400">Position Name</label>
        <input type="text" id="major" name="major" className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " required/>
      </div>
    </div>
  )

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className=" bg-black p-8  shadow-md w-full max-w-md">
        <span className='flex items-center justify-center pb-5 text-2xl text-[#9fd5e2]'>Welcome to questify</span>
        {success && <div className='text-white bg-green-500 py-1 rounded-md text-center'>Success!</div>}
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div>
            <label className="text-md font-medium text-gray-400">Email Address</label>
            <input type="email" id="email_address" name="email_address" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black" />
          </div>
          <div>
            <label className="text-md font-medium text-gray-400">University</label>
            <input type="text" id="university" name="university" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-md font-medium text-gray-400">First Name</label>
              <input type="text" id="first_name" name="first_name" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " />
            </div>
            <div>
              <label className="text-md font-medium text-gray-400">Last Name</label>
              <input type="text" id="last_name" name="last_name" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " />
            </div>
          </div>
          <div>
            <label className="text-md font-medium text-gray-400">Password</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " />
          </div>
          <div>
            <label className="text-md font-medium text-gray-400">Phone Number</label>
            <input type="tel" id="phone_number" name="phone_number" required className="mt-1 block w-full shadow-sm rounded-md pl-2 h-7 text-black " />
          </div>
          <div>
            <span className="text-md font-medium text-gray-400">Are you a student or employee?</span>
            <div className="mt-2 text-gray-400">
              <label className="inline-flex items-center">
                <input type="radio" name="userType" value="student" onChange={(e) => setUserType(e.target.value)} className="form-radio" />
                <span className="ml-2">Student</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" name="userType" value="employee" onChange={(e) => setUserType(e.target.value)} className="form-radio" />
                <span className="ml-2">Employee</span>
              </label>
            </div>
          </div>
          {userType === 'student' && <StudentFields/>}
          {userType === 'employee' && <EmployeeFields/>}
          <div>
            <button type="submit" className="w-full bg-blue-600 rounded-lg text-white py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}