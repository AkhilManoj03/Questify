"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const [errors, setErrors] = useState('');

  async function handleAction(formData) {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });
    if (result.ok) {
      router.replace("/search");
    } else if (result?.error) {
      setErrors('Please check your credentials');
    }
  }
  //
  return (
    <div className="flex min-h-screen flex-col justify-center items-center ">
      <div className="fixed inset-0 bg-no-repeat bg-cover bg-blend-darken " style={{ backgroundImage: "url('/colors.webp')" }}>
      </div>
      <div className="mx-auto w-full max-w-md px-8 py-12 bg-black shadow-lg rounded-lg z-10 relative">
        <form className="space-y-6" action={handleAction}>
          <fieldset>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div className="flex flex-col gap-4 items-center">
              {errors && <div className="text-red-500">{errors}</div>}
              <label className="w-full flex gap-4 items-center">
                <span className="w-20 text-gray-800 dark:text-gray-200">
                  Email
                </span>
                <input
                  name="email"
                  placeholder="Enter email address"
                  required={true}
                  autoFocus={true}
                  type="email"
                  autoComplete="email"
                  aria-describedby="email-error"
                  className="flex-1 bg-transparent border-2 border-gray-300 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500 p-2 rounded-md transition duration-200"
                />
              </label>
  
              <label className="w-full flex gap-4 items-center">
                <span className="w-20 text-gray-800 dark:text-gray-200">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required={true}
                  autoComplete="current-password"
                  aria-describedby="password-error"
                  className="flex-1 bg-transparent border-2 border-gray-300 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500 p-2 rounded-md transition duration-200"
                />
              </label>
  
              <button
                type="submit"
                aria-label="Login"
                name="_method"
                value="post"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold p-3 rounded-md transition duration-200"
              >
                Login
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
  }  
