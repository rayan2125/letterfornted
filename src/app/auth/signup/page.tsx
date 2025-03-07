"use client";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/app/api/apiCollection";

interface SignupFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
}



const signupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export default function SignupPage() {
    const { control, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
        resolver: yupResolver(signupSchema),
    });



    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8070/api/user", { withCredentials: true });
    //             console.log("User session:", response.data);
                
    //             if (response.data?.token) {
    //                 localStorage.setItem("token", response.data.token); // Store JWT if returned
    //             }
    //         } catch (error) {
    //             console.error("User session fetch error:", error);
    //         }
    //     };
    
    //     fetchUser();
    // }, []);
    

   

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
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>


            <>
                <form  className="mt-4 space-y-4">
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => <input {...field} type="password" className="w-full border rounded-lg p-2" />}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Sign Up</button> */}
                </form>

                <button
                    onClick={signInUser}
                    className="w-full bg-red-600 text-white p-2 mt-10 rounded-lg"
                >
                    Sign in with Google
                </button>

                <p className="mt-4 text-center">
                    Already have an account? <Link href="/auth/log-in" className="text-blue-500">Login</Link>
                </p>
            </>

        </div>
    );
}
