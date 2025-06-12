import { getMe } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: any = await getMe();
        if (res.status === true) {
          setUser(res.user);

          setLoading(false);
        } else {
          // router.replace("/");
        }
      } catch (error) {
        // router.replace("/");
      }
    };
    fetchUser();
  }, [router]);
  return { user, loading };
}
