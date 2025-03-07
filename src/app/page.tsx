"use client"; // Ensure it's a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // Import for cookie access

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/auth/get-token", {
          withCredentials: true, // Ensures cookies are included
        });

        const token = response.data.token;

        if (token) {
          Cookies.set("accessToken", token, { expires: 1, path: "/" }); // Store in cookies
          router.push("/dashboard");
        } else {
          router.push("/auth/signup");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/auth/signup");
      }
    };

    fetchToken();
  }, [router]);

  return null;
}
