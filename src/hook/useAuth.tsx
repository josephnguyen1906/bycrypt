"use client";
import { getMe } from "@/services/User.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: any = await getMe();
        if (res.status === true) {
          setUser(res.user);

          setLoading(false);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);
  return { user, loading };
}
