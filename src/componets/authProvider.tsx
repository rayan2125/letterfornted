"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://letterbackend.onrender.com/api/user", {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                // console.error("User fetch failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Redirect only after loading completes
    useEffect(() => {
        if (!loading && user === null) {
           
            router.replace("/auth/signup");
        }
    }, [loading, user, router]);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
}
