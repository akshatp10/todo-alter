"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../schema/authFormSchema";
import Input from "./InputComponent";
import useUserStore from "@/store/userStore";
import { userLogin, userRegister } from "@/services/db/userAuthenticate";

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function Authenticate() {

    const router = useRouter();
    const login = useUserStore((state) => state.login);
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<LoginData | RegisterData>(
        {
            resolver: zodResolver(isLogin ? loginSchema : registerSchema)
        }
    )

    const onSubmit: SubmitHandler<LoginData | RegisterData> = async (data) => {
        if (isLogin) {
            const response = await userLogin(data as LoginData);

            console.log(response);

            if (!response.success) {
                console.log(response.message);
                return;
            }

            login(response.data!);
            router.push("/home");
            return;
        }
        else {
            const response = await userRegister(data as RegisterData);

            console.log(response);

            if (!response.success) {
                console.log(response.message);
                return;
            }

            login(response.data!);
            router.push("/home");
        }
    }

    const toggleAuthMode = () => {
        setIsLogin((previous) => !previous);
        reset();
    };

    return (
        <div className="w-[50%] min-h-[50%] rounded-4xl flex flex-col justify-between items-center">
            {/* <h1 className="">{isLogin ? "Login" : "Register"}</h1> */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center gap-2 min-h-[50%]">
                <div className="flex flex-col gap-2 items-center justify-center">

                    <Input
                        type="email"
                        placeholder="Enter Your Email"
                        registration={register("email")}
                        error={errors.email}
                    />
                    {!isLogin &&
                        <Input
                            type="text"
                            placeholder="Enter Your Name"
                            registration={register("name")}
                            error={(errors as FieldErrors<RegisterData>).name}
                        />
                    }
                    <Input
                        type="password"
                        placeholder="Enter Your Password"
                        registration={register("password")}
                        error={errors.password}
                    />
                    {/* Confirm Password Only for register mode */}
                    {!isLogin && (
                        <Input
                            type="password"
                            placeholder="Confirm Your Password"
                            registration={register("confirmPassword")}
                            error={(errors as FieldErrors<RegisterData>).confirmPassword}
                        />
                    )}
                </div>

                <div className="flex flex-col mt-5">
                    <input type="submit" value={isLogin ? "Login" : "Register"} className="bg-blue-500 px-5 py-1 rounded-full text-white cursor-pointer hover:scale-[1.05]" />
                    <div className="text-[13px]">
                        {isLogin ?
                            <>
                                Don&aps;t have an account? <button onClick={toggleAuthMode} type="button" className="cursor-pointer text-blue-500">Register Now</button>
                            </>
                            :
                            <>
                                Already have an account? <button onClick={toggleAuthMode} type="button" className="cursor-pointer text-blue-500">Login Now</button>
                            </>
                        }
                    </div>
                </div>

            </form>
        </div>
    );
}