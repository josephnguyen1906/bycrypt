import { useEffect, useState } from "react";

export default function useWithdrawTimeCheck() {
  const [open, setOpen] = useState(false);

  const checkWithdrawTime = () => {
    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const isValidTime = currentMinutes >= 720 && currentMinutes < 1320; // 12:00 - 24:00

    if (!isValidTime) {
      const today = now.toDateString();

      const showedDate = localStorage.getItem("withdraw-popup-date");

      if (showedDate !== today) {
        setOpen(true);

        localStorage.setItem("withdraw-popup-date", today);
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    checkWithdrawTime();

    const interval = setInterval(checkWithdrawTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    open,
    setOpen,
  };
}
