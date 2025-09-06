"use client";
import { getMe } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

export default function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res: any = await getMe();
      if (res.status === true) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, router]);

  // 🔥 return thêm hàm fetchUser để gọi lại khi cần
  return { user, loading, refetchUser: fetchUser };
}
