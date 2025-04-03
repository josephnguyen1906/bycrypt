import { GameConfig } from "@/configs/GameConfig";
import { getPlayGameById } from "@/services/GameApi.service";
import { walletTransfer } from "@/services/Wallet.service";
import { useState } from "react";
import swal from "sweetalert";
import useAuth from "./useAuth";

export default function usePlayGame() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const playGame = async (
    code: string,
    id: string,
    onError?: (error: any) => void
  ): Promise<string | null> => {
    setLoading(true); // Bắt đầu trạng thái loading

    const tempWindow = window.open("", "_blank");
    const dataGame = GameConfig.find((item) => item.code === id);
    // const res: any = await getPlayGameById(code, id);
    if (!tempWindow) {
      swal(
        "Failed fund transfer",
        "Popup blocked by browser. Please allow popups.",
        "error"
      );
      setLoading(false); // Dừng trạng thái loading
      return null;
    }

    try {
      // Sử dụng code và id từ tham số vào API
      const res: any = await getPlayGameById(code, id);

      const wallet: any = await walletTransfer(
        user.coin,
        String(dataGame?.type),
        1
      );

      if (res.status === false) {
        tempWindow.close(); // Đóng tab nếu không có URL
        swal("Error", res.msg, "error");
        setLoading(false); // Dừng trạng thái loading
        return null;
      }
      if (res?.data?.playUrl && wallet) {
        tempWindow.location.href = res.data.playUrl;
        setLoading(false); // Dừng trạng thái loading sau khi đã mở tab mới
        return res.data.playUrl; // Trả về URL nếu có
      } else {
        tempWindow.close(); // Đóng tab nếu không có URL
        swal("Error", res.msg, "error");
        setLoading(false); // Dừng trạng thái loading
        return null;
      }
    } catch (error) {
      tempWindow.close();
      console.log("error", error);

      swal("Error", "Please login to play the game", "error");
      setLoading(false);
      if (onError) onError(error);
      return null;
    }
  };

  return { loading, playGame };
}
