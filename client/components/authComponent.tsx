"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),

    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),

    password: z
        .string()
        .min(6, "Password should be atleast 6 characters"),
});

const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),

    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),

    password: z
        .string()
        .min(6, "Password should be atleast 6 characters"),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function Authenticate() {

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<LoginData | RegisterData>(
        {
            resolver: zodResolver(isLogin ? loginSchema : registerSchema)
        }
    )

    const onSubmit: SubmitHandler<LoginData | RegisterData> = (data) => {
        if (isLogin) {
            console.log(data)
        }
        else {
            console.log(data)
        }
        redirect('/home')
    }

    const toggleAuthMode = () => {
        setIsLogin((previous) => !previous);
        reset();
    };

    return (
        // Need to fix the code
        <div className="w-[50%] min-h-[50%] rounded-4xl flex flex-col justify-between items-center">
            {/* <h1 className="">{isLogin ? "Login" : "Register"}</h1> */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center gap-2 min-h-[50%]">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <div className="w-full flex justify-between flex-col">
                        {/* <span>Email : </span> */}
                        <input
                            type="email"
                            className={`border-b px-2 py-1 outline-none ${errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                            {...register("email")}
                            placeholder="Enter Your Email"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>
                    <div className="w-full flex justify-between flex-col">
                        {/* <span>Name : </span> */}
                        <input
                            type="text"
                            className={`border-b px-2 py-1 outline-none ${errors.name
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                            {...register("name")}
                            placeholder="Enter Your name"
                        />

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>
                    <div className="w-full flex justify-between flex-col">
                        {/* <span>Password : </span> */}
                        <input
                            type="password"
                            className={`border-b px-2 py-1 outline-none ${errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                                }`}
                            {...register("password")}
                            placeholder="Enter Your Password"
                        />

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {!isLogin ?
                        <div className="w-full flex justify-between flex-col">
                            {/* <span>Confirm Password : </span> */}
                            <input
                                type="password"
                                className={`border-b px-2 py-1 outline-none ${"confirmPassword" in errors && errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                                {...register("confirmPassword")}
                                placeholder="Confirm Your Password"
                            />

                            {"confirmPassword" in errors &&
                                errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                        </div>
                        : ""
                    }
                </div>

                <div className="flex flex-col mt-5">
                    <input type="submit" value={isLogin ? "Login" : "Register"} className="bg-blue-500 px-5 py-1 rounded-full text-white cursor-pointer hover:scale-[1.05]" />
                    <div className="text-[13px]">
                        {isLogin ?
                            <>
                                Don't have an account? <button onClick={toggleAuthMode} className="cursor-pointer text-blue-500">Register Now</button>
                            </>
                            :
                            <>
                                Already have an account? <button onClick={toggleAuthMode} className="cursor-pointer text-blue-500">Login Now</button>
                            </>
                        }
                    </div>
                </div>

            </form>
        </div>
    );
}