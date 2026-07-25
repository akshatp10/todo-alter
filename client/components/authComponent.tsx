"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type authData = {
    email?: string,
    name?: string,
    password?: string,
    confirmPassword?: string
}

export default function Authenticate() {

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const { register, handleSubmit, watch, formState: { errors }, } = useForm()

    const onSubmit: SubmitHandler<authData> = (data) => {
        console.log(data)
        redirect('/home')
    }

    return (
        <div className="w-[50%] min-h-[50%] bg-gray-50 rounded-4xl flex flex-col justify-between items-center">
            <h1 className="">{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2">
                <p className="w-full">
                    <span>Email : </span>
                    <input type="email" name="email" id="email" className="border rounded-4xl" />
                </p>
                <p className="w-full">
                    <span>Name : </span>
                    <input type="text" className="border rounded-4xl" />
                </p>
                <p className="w-full">
                    <span>Password : </span>
                    <input type="password" name="passwrd" id="" className="border rounded-4xl" />
                </p>
                <p className="w-full">
                    <span>Confirm Password : </span>
                    <input type="password" name="cnfrmpasswrd" id="" className="border rounded-4xl" />
                </p>

                <input type="submit" value={isLogin ? "Login" : "Register"} className="bg-blue-500 px-5 py-1 rounded-full text-white cursor-pointer hover:scale-[1.05]" />
            </form>

            <div>
                {isLogin ?
                    <>
                        Don't have an account? <button onClick={() => { setIsLogin(false) }} className="cursor-pointer">Register Now</button>
                    </>
                    :
                    <>
                        Already have an account? <button onClick={() => { setIsLogin(true) }} className="cursor-pointer">Login Now</button>
                    </>
                }
            </div>
        </div>
    );
}