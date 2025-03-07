"use client";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { BASE_URL } from "@/app/api/apiCollection";

interface LoginFormInputs {
    email: string;
    password: string;
}

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginPage() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Login Data:", data);
      
    };
    const signInUser = async () => {
        try {
            // window.location.href = "http://localhost:8070/auth/google";
            window.location.href = `${BASE_URL}auth/google`;
        } catch (error) {
            console.error("Google Sign-in error:", error);
        }
    };
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <input {...field} className="w-full border rounded-lg p-2" />}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <input {...field} type="password" className="w-full border rounded-lg p-2" />}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Login</button> */}
            </form>
            <button
                    onClick={signInUser}
                    className="w-full bg-red-600 text-white p-2 mt-10 rounded-lg"
                >
                    Sign in with Google
                </button>
            <p className="mt-4 text-center">
            <p>Don&apos;t have an account?</p>
            <Link href="/auth/signup" className="text-blue-500">Sign Up</Link>
            </p>
        </div>
    );
}
