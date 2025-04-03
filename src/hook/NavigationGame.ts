import { toast } from "react-toastify";

export default function NavigationGame(url: string) {
  const openNewTab = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // Kiểm tra nếu có sự kiện tương tác của người dùng
  if (typeof window !== "undefined" && document.readyState === "complete") {
    document.body.addEventListener("click", openNewTab, { once: true });
  } else {
    toast.error("This function must be triggered by a user interaction.");
  }
}
