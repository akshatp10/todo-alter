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
        if (isLogin) {
            console.log(data)
        }
        else {
            console.log(data)
            redirect('/home')
        }
    }

    return (
        <div className="w-[50%] min-h-[50%] bg-gray-50 rounded-4xl flex flex-col justify-between items-center">
            <h1 className="">{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2">
                <p className="w-full flex justify-between flex-col">
                    <span>Email : </span>
                    <input type="email" id="email" className="border border-gray-300 rounded-xs  px-2 py-1" {...register("email", { required: true })} placeholder="Enter email" />
                </p>
                {!isLogin ?
                    <p className="w-full flex justify-between flex-col">
                        <span>Name : </span>
                        <input type="text" className="border border-gray-300 rounded-xs px-2 py-1" {...register("uname", { required: true })} placeholder="Enter your name" />
                    </p>
                    : ""
                }
                <p className="w-full flex justify-between flex-col">
                    <span>Password : </span>
                    <input type="password" id="" className="border border-gray-300 rounded-xs px-2 py-1" {...register("pwrd", { required: true })} placeholder="Enter password" />
                </p>
                {!isLogin ?
                    <p className="w-full flex justify-between flex-col">
                        <span>Confirm Password : </span>
                        <input type="password" id="" className="border border-gray-300 rounded-xs px-2 py-1" {...register("cnfrm_pwrd", { required: true })} placeholder="Confirm password" />
                    </p>
                    : ""
                }

                <input type="submit" value={isLogin ? "Login" : "Register"} className="bg-blue-500 px-5 py-1 rounded-full text-white cursor-pointer hover:scale-[1.05]" />
            </form>

            <div className="text-[13px]">
                {isLogin ?
                    <>
                        Don't have an account? <button onClick={() => { setIsLogin(false) }} className="cursor-pointer text-blue-500">Register Now</button>
                    </>
                    :
                    <>
                        Already have an account? <button onClick={() => { setIsLogin(true) }} className="cursor-pointer text-blue-500">Login Now</button>
                    </>
                }
            </div>
        </div>
    );
}